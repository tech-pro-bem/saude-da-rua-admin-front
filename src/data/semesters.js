/* eslint-disable consistent-return */
const semesters = [
  'FIRST',
  'SECOND',
  'THIRD',
  'FOURTH',
  'FIFTH',
  'SIXTH',
  'SEVENTH',
  'EIGHTH',
  'NINTH',
  'TENTH',
  'ELEVENTH',
  'TWELFTH',
  'THIRTEENTH',
  'FOURTEENTH',
  'FIFTEENTH',
];

export default function convertSemesterToNumber(semester) {
  const semesterNumber = semesters.indexOf(semester) + 1;
  return `${semesterNumber}º`;
}
