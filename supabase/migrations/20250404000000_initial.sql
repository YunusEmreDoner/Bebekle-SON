create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null,
  role text check (role is null or role in ('mother', 'father', 'caregiver', 'other')),
  journey_stage text check (journey_stage is null or journey_stage in ('pregnancy', 'born')),
  active_baby_id uuid,
  onboarding_completed boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.babies (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  status text not null check (status in ('pregnancy', 'born')),
  name text,
  due_date date,
  birth_date date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint babies_required_date check (
    (status = 'pregnancy' and due_date is not null and birth_date is null)
    or
    (status = 'born' and birth_date is not null)
  )
);

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'profiles_active_baby_id_fkey'
  ) then
    alter table public.profiles
      add constraint profiles_active_baby_id_fkey
      foreign key (active_baby_id)
      references public.babies(id)
      on delete set null;
  end if;
end;
$$;

create index if not exists babies_user_id_idx on public.babies(user_id);
create index if not exists profiles_active_baby_id_idx on public.profiles(active_baby_id);

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at
before update on public.profiles
for each row
execute procedure public.set_updated_at();

drop trigger if exists set_babies_updated_at on public.babies;
create trigger set_babies_updated_at
before update on public.babies
for each row
execute procedure public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  r text;
  j text;
begin
  r := nullif(trim(new.raw_user_meta_data ->> 'role'), '');
  if r is not null and r not in ('mother', 'father', 'caregiver', 'other') then
    r := null;
  end if;

  j := nullif(trim(new.raw_user_meta_data ->> 'journey_stage'), '');
  if j is not null and j not in ('pregnancy', 'born') then
    j := null;
  end if;

  insert into public.profiles (
    id,
    display_name,
    role,
    journey_stage
  )
  values (
    new.id,
    coalesce(
      nullif(trim(new.raw_user_meta_data ->> 'display_name'), ''),
      nullif(split_part(coalesce(new.email, ''), '@', 1), ''),
      'Yeni Kullanıcı'
    ),
    r,
    j
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row
execute procedure public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.babies enable row level security;

drop policy if exists "Users can view own profile" on public.profiles;
create policy "Users can view own profile"
on public.profiles
for select
to authenticated
using (auth.uid() = id);

drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile"
on public.profiles
for update
to authenticated
using (auth.uid() = id)
with check (
  auth.uid() = id
  and (
    active_baby_id is null
    or exists (
      select 1
      from public.babies b
      where b.id = active_baby_id
        and b.user_id = auth.uid()
    )
  )
);

drop policy if exists "Users can view own babies" on public.babies;
create policy "Users can view own babies"
on public.babies
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users can insert own babies" on public.babies;
create policy "Users can insert own babies"
on public.babies
for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "Users can update own babies" on public.babies;
create policy "Users can update own babies"
on public.babies
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users can delete own babies" on public.babies;
create policy "Users can delete own babies"
on public.babies
for delete
to authenticated
using (auth.uid() = user_id);
