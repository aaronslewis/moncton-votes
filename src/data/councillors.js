/**
 * councillors.js
 * Imports councillors_data.json and transforms it into the shape the UI expects.
 */
import data from './councillors_data_sourced.json';

export const metadata = data.metadata;

// Internal keys matching the 6 category labels (in JSON order)
const CATEGORY_KEYS = [
  'conductProfessionalism',
  'transparencyAccountability',
  'effectivenessInitiative',
  'collaborationRelationships',
  'communityEngagement',
  'scrutinyOversight',
];

export const SCORECARD_CATEGORIES = data.metadata.categories.map((name, i) => ({
  key:   CATEGORY_KEYS[i],
  label: name,
}));

// Transform each councillor from the JSON shape into the UI shape
export const councillors = data.councillors.map((c) => ({
  ...c,
  slug: c.id,
  descriptor: getDescriptor(c.score),
  grades: Object.fromEntries(
    c.categories.map((cat, i) => [
      CATEGORY_KEYS[i],
      {
        letter: cat.grade,
        score:  cat.score,
        notes:  cat.assessment,
        note:   cat.note || null,   // present on the 3 revised grades
      },
    ])
  ),
}));

/** CSS colour variable matching the descriptor tier for a given score */
export function getDescriptorColor(score) {
  if (score >= 80) return '#065F46';
  if (score >= 70) return '#1E40AF';
  if (score >= 60) return '#92400E';
  return '#991B1B';
}

/** Full tier colour set — bg, text, and bar colours */
export function getTierColors(score) {
  if (score >= 80) return { bg: '#D1FAE5', text: '#065F46', bar: '#059669' };
  if (score >= 70) return { bg: '#DBEAFE', text: '#1E40AF', bar: '#2563EB' };
  if (score >= 60) return { bg: '#FEF3C7', text: '#92400E', bar: '#D97706' };
  return { bg: '#FEE2E2', text: '#991B1B', bar: '#DC2626' };
}

/** Descriptor label for a score */
export function getDescriptor(score) {
  if (score >= 80) return 'Great';
  if (score >= 70) return 'Good';
  if (score >= 60) return 'Okay';
  return 'Poor';
}

export default councillors;
