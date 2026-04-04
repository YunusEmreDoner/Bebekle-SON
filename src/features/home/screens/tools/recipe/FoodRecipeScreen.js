import React, { useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';
import { COLORS } from '../../../../../theme/colors';
import recipeData from '../../../../../domain/tools/recipe/dailyRecipe';

function MetaChip({ icon, label, value, unit = '' }) {
  if (value == null || value === '') return null;
  const suffix = unit ? ` ${unit}` : '';
  return (
    <View style={styles.chip}>
      <Text style={styles.chipIcon}>{icon}</Text>
      <Text style={styles.chipText}>
        {label}: {value}
        {suffix}
      </Text>
    </View>
  );
}

export default function FoodRecipeScreen() {
  const recipe = useMemo(() => recipeData, []);

  const imageSource =
    recipe.imageUri != null
      ? typeof recipe.imageUri === 'string'
        ? { uri: recipe.imageUri }
        : recipe.imageUri
      : null;

  const ingredients = Array.isArray(recipe.ingredients) ? recipe.ingredients : [];
  const steps = Array.isArray(recipe.steps) ? recipe.steps : [];
  const tags = Array.isArray(recipe.tags) ? recipe.tags : [];

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.inner}>
      <View style={styles.heroWrap}>
        {imageSource ? (
          <Image source={imageSource} style={styles.heroImg} resizeMode="cover" />
        ) : (
          <View style={styles.heroPlaceholder}>
            <Text style={styles.placeholderIcon}>🥗</Text>
            <Text style={styles.placeholderHint}>Tarif görseli</Text>
          </View>
        )}
      </View>

      {!!recipe.dateKey?.trim() && (
        <Text style={styles.dateKey}>{recipe.dateKey}</Text>
      )}

      <Text style={styles.title}>
        {recipe.title?.trim() || 'Tarif başlığı'}
      </Text>
      {!!recipe.subtitle?.trim() && (
        <Text style={styles.subtitle}>{recipe.subtitle}</Text>
      )}

      <View style={styles.metaRow}>
        <MetaChip icon="⏱" label="Hazırlık" value={recipe.prepMinutes} unit="dk" />
        <MetaChip icon="🔥" label="Pişirme" value={recipe.cookMinutes} unit="dk" />
        <MetaChip icon="🍽" label="Porsiyon" value={recipe.servings} />
      </View>

      {tags.filter((t) => t?.trim?.()).length > 0 && (
        <View style={styles.tags}>
          {tags
            .filter((t) => t?.trim?.())
            .map((t, i) => (
              <View key={i} style={styles.tagPill}>
                <Text style={styles.tagText}>{t}</Text>
              </View>
            ))}
        </View>
      )}

      <Text style={styles.blockTitle}>Malzemeler</Text>
      <View style={styles.ingredientBox}>
        {ingredients.length === 0 ? (
          <Text style={styles.emptyLine}>Malzeme listesi burada listelenecek.</Text>
        ) : (
          ingredients.map((row, i) => {
            const line =
              typeof row === 'string'
                ? row
                : [row.amount, row.name].filter(Boolean).join(' · ');
            return (
              <View key={i} style={styles.ingredientRow}>
                <View style={styles.ingredientDot} />
                <Text style={styles.ingredientText}>{line}</Text>
              </View>
            );
          })
        )}
      </View>

      <Text style={styles.blockTitle}>Adımlar</Text>
      {steps.length === 0 ? (
        <Text style={styles.emptyLine}>Hazırlık adımları burada numaralanır.</Text>
      ) : (
        steps.map((step, i) => (
          <View key={i} style={styles.stepRow}>
            <View style={styles.stepNum}>
              <Text style={styles.stepNumText}>{i + 1}</Text>
            </View>
            <Text style={styles.stepText}>{step}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: COLORS.beyaz,
  },
  inner: {
    paddingBottom: 36,
  },
  heroWrap: {
    width: '100%',
    height: 220,
    backgroundColor: COLORS.acikGri,
  },
  heroImg: {
    width: '100%',
    height: '100%',
  },
  heroPlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  placeholderIcon: {
    fontSize: 48,
    marginBottom: 8,
  },
  placeholderHint: {
    fontSize: 12,
    color: COLORS.metinAcik,
    paddingHorizontal: 24,
    textAlign: 'center',
  },
  dateKey: {
    fontSize: 12,
    color: COLORS.metinAcik,
    marginTop: 16,
    marginHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.metin,
    marginTop: 8,
    marginHorizontal: 20,
    lineHeight: 30,
  },
  subtitle: {
    fontSize: 15,
    color: COLORS.metinAcik,
    marginTop: 8,
    marginHorizontal: 20,
    lineHeight: 22,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 16,
    marginHorizontal: 20,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.krem,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  chipIcon: {
    marginRight: 6,
    fontSize: 14,
  },
  chipText: {
    fontSize: 13,
    color: COLORS.metin,
    fontWeight: '500',
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 14,
    marginHorizontal: 20,
  },
  tagPill: {
    backgroundColor: COLORS.lavanda,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.koyuMor,
  },
  blockTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.metin,
    marginTop: 24,
    marginBottom: 10,
    marginHorizontal: 20,
  },
  ingredientBox: {
    marginHorizontal: 20,
    padding: 14,
    backgroundColor: COLORS.acikGri,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  ingredientRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  ingredientDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.mor,
    marginTop: 8,
    marginRight: 10,
  },
  ingredientText: {
    flex: 1,
    fontSize: 15,
    color: COLORS.metin,
    lineHeight: 22,
  },
  emptyLine: {
    fontSize: 14,
    color: COLORS.metinAcik,
    lineHeight: 20,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 14,
    paddingHorizontal: 20,
  },
  stepNum: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.pudraPembesi,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  stepNumText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.koyuMor,
  },
  stepText: {
    flex: 1,
    fontSize: 15,
    color: COLORS.metin,
    lineHeight: 23,
  },
});
