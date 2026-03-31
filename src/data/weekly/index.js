import week01 from './week01';
import week02 from './week02';
import week03 from './week03';
import week04 from './week04';
import week05 from './week05';
import week06 from './week06';
import week07 from './week07';
import week08 from './week08';
import week09 from './week09';
import week10 from './week10';
import week11 from './week11';
import week12 from './week12';
import week13 from './week13';
import week14 from './week14';
import week15 from './week15';
import week16 from './week16';
import week17 from './week17';
import week18 from './week18';
import week19 from './week19';
import week20 from './week20';
import week21 from './week21';
import week22 from './week22';
import week23 from './week23';
import week24 from './week24';
import week25 from './week25';
import week26 from './week26';
import week27 from './week27';
import week28 from './week28';
import week29 from './week29';
import week30 from './week30';
import week31 from './week31';
import week32 from './week32';
import week33 from './week33';
import week34 from './week34';
import week35 from './week35';
import week36 from './week36';
import week37 from './week37';
import week38 from './week38';
import week39 from './week39';
import week40 from './week40';
import week41 from './week41';
import week42 from './week42';

const weeklyData = {
  1: week01,
  2: week02,
  3: week03,
  4: week04,
  5: week05,
  6: week06,
  7: week07,
  8: week08,
  9: week09,
  10: week10,
  11: week11,
  12: week12,
  13: week13,
  14: week14,
  15: week15,
  16: week16,
  17: week17,
  18: week18,
  19: week19,
  20: week20,
  21: week21,
  22: week22,
  23: week23,
  24: week24,
  25: week25,
  26: week26,
  27: week27,
  28: week28,
  29: week29,
  30: week30,
  31: week31,
  32: week32,
  33: week33,
  34: week34,
  35: week35,
  36: week36,
  37: week37,
  38: week38,
  39: week39,
  40: week40,
  41: week41,
  42: week42,
};

export function getWeekData(weekNumber) {
  const clamped = Math.max(1, Math.min(42, weekNumber));
  return weeklyData[clamped] || weeklyData[1];
}

export default weeklyData;
