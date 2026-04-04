/** Tahmini doğum tarihine göre hamilelik günü / haftası ve trimester. */
export function calculatePregnancyInfo(dueDate) {
  const now = new Date();
  const due = new Date(dueDate);

  const pregnancyStart = new Date(due);
  pregnancyStart.setDate(pregnancyStart.getDate() - 280);

  const diffMs = now - pregnancyStart;
  const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const currentDay = Math.max(1, Math.min(294, totalDays));

  const currentWeek = Math.max(1, Math.min(42, Math.ceil(currentDay / 7)));
  const dayOfWeek = ((currentDay - 1) % 7) + 1;
  const daysUntilDue = Math.max(0, Math.ceil((due - now) / (1000 * 60 * 60 * 24)));

  return {
    currentDay,
    currentWeek,
    dayOfWeek,
    daysUntilDue,
    trimester: currentWeek <= 13 ? 1 : currentWeek <= 26 ? 2 : 3,
  };
}
