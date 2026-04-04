import chinese from './genderAssumptionChinese';
import mayan from './genderAssumptionMayan';
import ring from './genderAssumptionRing';
import turkish from './genderAssumptionTurkish';
import japanese from './genderAssumptionJapanese';
import indian from './genderAssumptionIndian';

export const GENDER_ASSUMPTION_METHODS = [chinese, mayan, ring, turkish, japanese, indian];

const byId = Object.fromEntries(GENDER_ASSUMPTION_METHODS.map((m) => [m.id, m]));

export function getGenderAssumptionById(id) {
  return byId[id] || null;
}
