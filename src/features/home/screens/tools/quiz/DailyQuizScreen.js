import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../../../../theme/colors';
import quizData from '../../../../../domain/tools/quiz/dailyQuiz';

export default function DailyQuizScreen() {
  const quiz = useMemo(() => quizData, []);
  const [picked, setPicked] = useState(null);

  const showResult = picked !== null;
  const isCorrect = picked === quiz.correctIndex;

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.inner}>
      <View style={styles.metaRow}>
        {!!quiz.categoryLabel?.trim() && (
          <View style={styles.pill}>
            <Text style={styles.pillText}>{quiz.categoryLabel}</Text>
          </View>
        )}
        {!!quiz.dateKey?.trim() && (
          <Text style={styles.dateLabel}>{quiz.dateKey}</Text>
        )}
      </View>

      <View style={styles.card}>
        <Text style={styles.qLabel}>Günün sorusu</Text>
        <Text style={styles.question}>
          {quiz.question?.trim() || 'Günlük soru metni'}
        </Text>

        <View style={styles.options}>
          {(quiz.options || []).map((opt, index) => {
            const letter = String.fromCharCode(65 + index);
            const selected = picked === index;
            const correct = index === quiz.correctIndex;
            let optStyle = styles.option;
            let textStyle = styles.optionText;
            if (showResult) {
              if (correct) {
                optStyle = [styles.option, styles.optionCorrect];
                textStyle = [styles.optionText, styles.optionTextStrong];
              } else if (selected && !correct) {
                optStyle = [styles.option, styles.optionWrong];
              }
            } else if (selected) {
              optStyle = [styles.option, styles.optionSelected];
            }
            return (
              <TouchableOpacity
                key={index}
                style={optStyle}
                activeOpacity={0.85}
                disabled={showResult}
                onPress={() => setPicked(index)}
              >
                <Text style={styles.optionLetter}>{letter}</Text>
                <Text style={textStyle}>
                  {opt?.trim?.() ? opt : `Seçenek ${letter}`}
                </Text>
                {showResult && correct && (
                  <Ionicons name="checkmark-circle" size={22} color={COLORS.mor} />
                )}
                {showResult && selected && !correct && (
                  <Ionicons name="close-circle" size={22} color="#C44" />
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {showResult && (
          <View
            style={[
              styles.feedback,
              isCorrect ? styles.feedbackOk : styles.feedbackNeutral,
            ]}
          >
            <Text style={styles.feedbackTitle}>
              {isCorrect ? 'Doğru' : 'Cevap'}
            </Text>
            <Text style={styles.feedbackBody}>
              {quiz.explanation?.trim() || 'Kısa açıklama metni burada.'}
            </Text>
          </View>
        )}

        {showResult && (
          <TouchableOpacity
            style={styles.resetBtn}
            onPress={() => setPicked(null)}
            activeOpacity={0.85}
          >
            <Text style={styles.resetText}>Tekrar dene</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: COLORS.acikGri,
  },
  inner: {
    padding: 16,
    paddingBottom: 32,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  pill: {
    backgroundColor: COLORS.lavanda,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  pillText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.koyuMor,
  },
  dateLabel: {
    fontSize: 12,
    color: COLORS.metinAcik,
  },
  card: {
    backgroundColor: COLORS.beyaz,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  qLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.metinAcik,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  question: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.metin,
    lineHeight: 26,
    marginBottom: 20,
  },
  options: {
    gap: 10,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.acikGri,
    gap: 10,
  },
  optionSelected: {
    borderColor: COLORS.mor,
    backgroundColor: COLORS.krem,
  },
  optionCorrect: {
    borderColor: COLORS.mor,
    backgroundColor: '#F5E8F2',
  },
  optionWrong: {
    borderColor: '#E8C4C4',
    backgroundColor: '#FFF5F5',
  },
  optionLetter: {
    width: 28,
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.koyuMor,
  },
  optionText: {
    flex: 1,
    fontSize: 15,
    color: COLORS.metin,
    lineHeight: 22,
  },
  optionTextStrong: {
    fontWeight: '600',
  },
  feedback: {
    marginTop: 20,
    padding: 14,
    borderRadius: 12,
  },
  feedbackOk: {
    backgroundColor: COLORS.krem,
    borderWidth: 1,
    borderColor: COLORS.pudraPembesi,
  },
  feedbackNeutral: {
    backgroundColor: COLORS.acikGri,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  feedbackTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.metin,
    marginBottom: 6,
  },
  feedbackBody: {
    fontSize: 14,
    color: COLORS.metin,
    lineHeight: 21,
  },
  resetBtn: {
    marginTop: 16,
    alignSelf: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: COLORS.lavanda,
  },
  resetText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.koyuMor,
  },
});
