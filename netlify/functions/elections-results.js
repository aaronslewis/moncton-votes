const RESULTS_URL =
  'https://www3.gnb.ca/elections/results-resultats/2026-05-11/MUN/data/arearesults.json';

const MONCTON_ID = '1064';
const WARD_IDS = ['1266', '1267', '1268', '1269'];

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

    // Return only Moncton + its wards to keep the payload small
    const payload = {
      timestamp: data.timestamp ?? null,
      moncton: areaResults[MONCTON_ID] ?? null,
      wards: Object.fromEntries(WARD_IDS.map((id) => [id, areaResults[id] ?? null])),
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
