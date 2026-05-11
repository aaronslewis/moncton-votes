const RESULTS_URL =
  'https://www3.gnb.ca/elections/results-resultats/2026-05-11/MUN/data/arearesults.json';

export const handler = async () => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);

  try {
    const res = await fetch(`${RESULTS_URL}?t=${Date.now()}`, {
      signal: controller.signal,
      headers: { 'Accept': 'application/json' },
    });
    clearTimeout(timeout);

    if (!res.ok) {
      return {
        statusCode: res.status,
        body: JSON.stringify({ error: `Upstream returned ${res.status}` }),
      };
    }

    const data = await res.json();
    const areaResults = data.areaResults ?? {};

    // Find Moncton-related areas by name rather than hard-coded IDs
    let monctonId = null;
    const wardIds = [];
    const allAreaNames = {};

    for (const [id, area] of Object.entries(areaResults)) {
      const name = (area?.areaName ?? '').toLowerCase();
      allAreaNames[id] = area?.areaName ?? '(no name)';
      if (name.includes('moncton')) {
        // Check if this is the city-level entry (has mayor contest) or a ward
        const hasWard = (area?.contestResults ?? []).some(
          (c) => /ward|quartier/i.test(c.contestName ?? '')
        );
        const hasMayor = (area?.contestResults ?? []).some(
          (c) => /mayor|maire/i.test(c.contestName ?? '')
        );
        if (hasMayor && !hasWard) {
          monctonId = id;
        } else if (hasWard || /ward\s*\d|quartier\s*\d/i.test(name)) {
          wardIds.push(id);
        } else if (!monctonId) {
          // Fallback: first Moncton entry without ward in name is probably city-level
          monctonId = id;
        }
      }
    }

    const payload = {
      timestamp: data.timestamp ?? null,
      moncton: monctonId ? areaResults[monctonId] : null,
      wards: Object.fromEntries(wardIds.map((id) => [id, areaResults[id]])),
      _debug: { monctonId, wardIds, totalAreas: Object.keys(areaResults).length },
    };

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
      body: JSON.stringify(payload),
    };
  } catch (err) {
    clearTimeout(timeout);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
