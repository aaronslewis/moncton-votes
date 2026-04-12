/**
 * wardStreetMap.js
 *
 * A static mapping of street names and neighbourhood keywords to Moncton ward values.
 * Keys are lowercase substrings that might appear in an address input.
 *
 * To add a new street or neighbourhood, add an entry in the appropriate ward section.
 */

export const wardStreetMap = {
  // ── Ward 1 — Northeastern Moncton ──────────────────────────────
  'elmwood':      'ward1',
  'lakeburn':     'ward1',
  'mapleton':     'ward1',
  'sunny brae':   'ward1',
  'ryan':         'ward1',
  'paradise':     'ward1',
  'birchmount':   'ward1',
  'humphrey':     'ward1',
  'lacombe':      'ward1',
  'wedgewood':    'ward1',
  'heritage':     'ward1',
  'pinehurst':    'ward1',

  // ── Ward 2 — Northwestern Moncton ──────────────────────────────
  'moncton north': 'ward2',
  'garden':        'ward2',
  'lewisville':    'ward2',
  'caledonia':     'ward2',
  'hildegard':     'ward2',
  'mountain':      'ward2',
  'gorge':         'ward2',
  'homestead':     'ward2',
  'parkton':       'ward2',
  'barker':        'ward2',
  'stedman':       'ward2',
  'beaverbrook':   'ward2',

  // ── Ward 3 — Central / Downtown Moncton ────────────────────────
  'main':          'ward3',
  'botsford':      'ward3',
  'lutz':          'ward3',
  'highfield':     'ward3',
  'victoria':      'ward3',
  'westmorland':   'ward3',
  'king':          'ward3',
  'downsview':     'ward3',
  'assumption':    'ward3',
  'foundry':       'ward3',
  'telegraph':     'ward3',
  'chapel':        'ward3',
  'church':        'ward3',
  'robinson':      'ward3',

  // ── Ward 4 — Southern Moncton ───────────────────────────────────
  'wheeler':       'ward4',
  'coverdale':     'ward4',
  'lincoln':       'ward4',
  'morton':        'ward4',
  'cedar':         'ward4',
  'killam':        'ward4',
  'shediac':       'ward4',
  'piper':         'ward4',
  'dieppe':        'ward4',
  'pleasant':      'ward4',
  'fawcett':       'ward4',
  'champlain':     'ward4',
};

/**
 * Look up a ward from a free-text address or street name input.
 * Returns the ward value string (e.g. 'ward1') or null if not found.
 *
 * @param {string} addressInput  Raw address string from the user
 * @returns {'ward1'|'ward2'|'ward3'|'ward4'|null}
 */
export function lookupWard(addressInput) {
  if (!addressInput || typeof addressInput !== 'string') return null;
  const lower = addressInput.toLowerCase().trim();
  if (!lower) return null;

  for (const [keyword, ward] of Object.entries(wardStreetMap)) {
    if (lower.includes(keyword)) return ward;
  }
  return null;
}
