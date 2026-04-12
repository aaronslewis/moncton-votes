# Moncton City Poli

**Know your council. Make an informed vote.**

A free, non-partisan civic resource for residents of Moncton, NB. Moncton City Poli provides:

- **2021–2025 Council Report Cards** — Performance scorecards for the outgoing council term, graded across six categories on a 4.0 GPA scale.
- **2025 Candidates by Ward** — Find who's running for Mayor, At-Large, and your ward seat.
- **Voter Compass** *(coming soon)* — Answer questions about local issues and see which candidates best match your values.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend framework | [React 18](https://react.dev/) |
| Build tool | [Vite 5](https://vitejs.dev/) |
| Routing | [React Router v6](https://reactrouter.com/) |
| Hosting | [Netlify](https://netlify.com/) |
| Docx extraction | [Mammoth.js](https://github.com/mwilliamson/mammoth.js) (dev script only) |

---

## Local Development

### Prerequisites

- Node.js 18 or 20+
- npm 9+

### Install and run

```bash
npm install
npm run dev
```

The site will be available at `http://localhost:5173`.

---

## Loading Councillor Data from .docx Files

Councillor scorecard grades are extracted from `.docx` source documents using a Node.js script.

### Step 1 — Prepare your .docx files

Place your scorecard documents in the **project root** (same folder as `package.json`). The script looks for files matching this naming pattern:

```
Councillor_Scorecard_FirstName_LastName.docx
```

For example:
```
Councillor_Scorecard_Dawn_Arnold.docx
Councillor_Scorecard_Pierre_Boudreau.docx
Moncton_Council_Comparison_2021-2025.docx   (optional)
```

### Step 2 — Run the extraction script

```bash
npm run extract
```

The script will:
1. Find all `Councillor_Scorecard_*.docx` files in the project root
2. Use Mammoth to extract text from each document
3. Parse grade letters (A+, A, A-, B+, B, B-, C+, C, C-, D+, D, F) for each of the six categories
4. Write extracted data to `src/data/councillors-extracted.json`

### Step 3 — Review and apply the extracted data

Open `src/data/councillors-extracted.json` and verify the extracted grades look correct. Then update `src/data/councillors.js` with the real names and grades, or modify the app to import directly from the JSON file.

### Step 4 — Restart the dev server

```bash
npm run dev
```

**Note:** The extraction script uses pattern matching and works best when .docx files clearly label each category heading followed by a grade letter. If a grade is not detected, check the formatting of your source document.

---

## Updating Candidate Data

Edit `src/data/candidates.js` directly. The file exports a `candidates` object with the following keys:

```js
candidates.mayor      // Array of mayoral candidates
candidates.atLarge    // Array of at-large candidates
candidates.ward1      // Array of Ward 1 candidates
candidates.ward2      // Array of Ward 2 candidates
candidates.ward3      // Array of Ward 3 candidates
candidates.ward4      // Array of Ward 4 candidates
```

Each candidate object has this structure:

```js
{
  id: 'unique-id-string',
  name: 'Candidate Full Name',
  ward: 'Ward 1',             // or 'City-Wide (Mayoral)', 'At-Large', etc.
  photo: null,                // or a URL string when photos are available
  bio: 'A short biography...',
  platform: [
    'Platform point one',
    'Platform point two',
    'Platform point three',
  ],
}
```

---

## Updating the Ward / Street Map

The ward address lookup is driven by a static keyword map in `src/data/wardStreetMap.js`.

To add a new street or neighbourhood:

```js
// In wardStreetMap.js, add to the appropriate ward section:
'mountview': 'ward1',   // lowercase keyword
```

The `lookupWard(addressInput)` function does a case-insensitive substring match, so `'mountain'` will match "Mountain Road", "Mountain Ave", etc.

---

## Deployment to Netlify

### Option A — Deploy from GitHub (recommended)

1. Push this repository to GitHub.
2. Log in to [Netlify](https://app.netlify.com/) and click **Add new site → Import an existing project**.
3. Connect your GitHub account and select the repository.
4. Netlify will auto-detect the build settings from `netlify.toml`:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. Click **Deploy site**.

### Option B — Netlify CLI

```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

---

## Adding a Custom Domain

Once deployed to Netlify:

1. Go to **Site settings → Domain management → Add custom domain**.
2. Enter `monctoncitypoli.ca`.
3. Add a CNAME record at your DNS registrar:
   ```
   Type:  CNAME
   Name:  www
   Value: <your-netlify-site>.netlify.app
   ```
   Or for the apex domain (`monctoncitypoli.ca`), use an ALIAS / ANAME record pointing to the same Netlify address (or use Netlify DNS for full management).
4. Enable **HTTPS** in Netlify's domain settings — Netlify provisions a free Let's Encrypt certificate automatically.

---

## Non-Partisanship Policy

This site must remain strictly non-partisan. Contributors are expected to:

- Apply **identical evaluation criteria** to all councillors and candidates regardless of political leaning.
- **Not endorse or recommend** any candidate or party.
- Base all grades and assessments on **publicly verifiable information** (meeting minutes, recorded votes, public statements, official documents).
- Correct factual errors promptly when raised.
- Disclose any potential conflict of interest when contributing assessments.

This site is not affiliated with the City of Moncton, any political party, or any campaign. Hosting costs and development are community-funded. There is no advertising.
