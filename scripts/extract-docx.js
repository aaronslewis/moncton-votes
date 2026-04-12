/**
 * extract-docx.js
 *
 * Extracts councillor scorecard data from .docx files and writes structured
 * JSON to src/data/councillors-extracted.json.
 *
 * Usage:
 *   node scripts/extract-docx.js
 *
 * Expected input files in project root:
 *   Councillor_Scorecard_<Name>.docx   (one per councillor)
 *   Moncton_Council_Comparison_2021-2025.docx  (optional comparison doc)
 */

import { readFileSync, writeFileSync, readdirSync, existsSync } from 'fs';
import { join, dirname, basename } from 'path';
import { fileURLToPath } from 'url';
import mammoth from 'mammoth';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const OUTPUT_PATH = join(ROOT, 'src', 'data', 'councillors-extracted.json');

// ── Grade → GPA conversion ────────────────────────────────────────────────────

const GRADE_TO_GPA = {
  'A+': 4.0,
  'A':  4.0,
  'A-': 3.7,
  'B+': 3.3,
  'B':  3.0,
  'B-': 2.7,
  'C+': 2.3,
  'C':  2.0,
  'C-': 1.7,
  'D+': 1.3,
  'D':  1.0,
  'D-': 0.7,
  'F':  0.0,
};

function gradeToGPA(letter) {
  return GRADE_TO_GPA[letter.trim().toUpperCase()] ?? 0;
}

// ── Category patterns ─────────────────────────────────────────────────────────

const CATEGORY_PATTERNS = [
  {
    key: 'conductProfessionalism',
    label: 'Conduct & Professionalism',
    patterns: [/conduct\s*[&and]+\s*professionalism/i, /conduct\s*\/\s*professionalism/i, /\bconduct\b/i],
  },
  {
    key: 'transparencyAccountability',
    label: 'Transparency & Accountability',
    patterns: [/transparency\s*[&and]+\s*accountability/i, /transparency\s*\/\s*accountability/i, /\btransparency\b/i],
  },
  {
    key: 'effectivenessInitiative',
    label: 'Effectiveness & Initiative',
    patterns: [/effectiveness\s*[&and]+\s*initiative/i, /effectiveness\s*\/\s*initiative/i, /\beffectiveness\b/i],
  },
  {
    key: 'collaborationRelationships',
    label: 'Collaboration & Relationships',
    patterns: [/collaboration\s*[&and]+\s*relationships/i, /collaboration\s*\/\s*relationships/i, /\bcollaboration\b/i],
  },
  {
    key: 'communityEngagement',
    label: 'Community Engagement',
    patterns: [/community\s*engagement/i, /\bcommunity\b/i],
  },
  {
    key: 'scrutinyOversight',
    label: 'Scrutiny & Oversight',
    patterns: [/scrutiny\s*[&and]+\s*oversight/i, /scrutiny\s*\/\s*oversight/i, /\bscrutiny\b/i],
  },
];

// Grade letter regex — matches patterns like "A+", "B-", "C", "F" near category names
const GRADE_REGEX = /\b([ABCDF][+-]?)\b/;

// ── Extraction logic ──────────────────────────────────────────────────────────

/**
 * Given the full text of a scorecard document, attempt to extract one grade
 * per category by scanning lines for keyword + grade letter proximity.
 *
 * @param {string} text  Raw text from mammoth
 * @returns {Object}     Map of category key → { letter, gpa, notes }
 */
function extractGrades(text) {
  const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);
  const grades = {};

  for (const cat of CATEGORY_PATTERNS) {
    let found = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Check if this line mentions the category
      const matches = cat.patterns.some((p) => p.test(line));
      if (!matches) continue;

      // Look for a grade letter on this line or the next 3 lines
      for (let j = i; j <= Math.min(i + 3, lines.length - 1); j++) {
        const gradeMatch = lines[j].match(GRADE_REGEX);
        if (gradeMatch) {
          const letter = gradeMatch[1].toUpperCase();
          if (GRADE_TO_GPA[letter] !== undefined) {
            const notesLines = lines.slice(i, Math.min(i + 8, lines.length));
            const notes = notesLines.join(' ').substring(0, 500);
            grades[cat.key] = {
              letter,
              gpa: gradeToGPA(letter),
              notes,
            };
            found = true;
            break;
          }
        }
      }
      if (found) break;
    }

    if (!found) {
      grades[cat.key] = {
        letter: '—',
        gpa: 0,
        notes: `[${cat.label} grade not found in document. Check the .docx file formatting.]`,
      };
    }
  }

  return grades;
}

/**
 * Compute the overall GPA as the mean of all six category GPAs.
 * Returns 0 if no categories have data.
 */
function computeOverallGPA(grades) {
  const values = Object.values(grades).map((g) => g.gpa);
  if (values.length === 0) return 0;
  const nonZero = values.filter((v) => v > 0);
  if (nonZero.length === 0) return 0;
  const sum = nonZero.reduce((acc, v) => acc + v, 0);
  return Math.round((sum / nonZero.length) * 100) / 100;
}

/**
 * Attempt to extract the councillor's name from the document text or filename.
 */
function extractName(text, filename) {
  // Try to find "Name:" or similar patterns at the top of the document
  const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);
  for (const line of lines.slice(0, 10)) {
    const nameMatch = line.match(/^name[:\s]+(.+)$/i);
    if (nameMatch) return nameMatch[1].trim();
  }

  // Fall back to filename: Councillor_Scorecard_John_Smith.docx → "John Smith"
  const base = basename(filename, '.docx');
  const parts = base.split('_').slice(2); // remove "Councillor" and "Scorecard"
  if (parts.length > 0) return parts.join(' ');

  return '[Unknown — check .docx filename]';
}

/**
 * Process a single scorecard .docx file.
 */
async function processScorecard(filePath) {
  console.log(`  Processing: ${basename(filePath)}`);

  let rawText;
  try {
    const result = await mammoth.extractRawText({ path: filePath });
    rawText = result.value;

    if (result.messages.length > 0) {
      result.messages.forEach((m) => {
        if (m.type === 'warning') console.warn(`    ⚠ ${m.message}`);
      });
    }
  } catch (err) {
    console.error(`    ✗ Failed to read ${basename(filePath)}: ${err.message}`);
    return null;
  }

  const name = extractName(rawText, filePath);
  const grades = extractGrades(rawText);
  const overallGPA = computeOverallGPA(grades);

  // Build a summary from the first substantial paragraph in the doc
  const lines = rawText.split('\n').map((l) => l.trim()).filter((l) => l.length > 60);
  const summary = lines[0] || '[Summary not found — check .docx file content.]';

  return {
    name,
    grades,
    overallGPA,
    summary,
    sourceFile: basename(filePath),
  };
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log('');
  console.log('Moncton City Poli — Scorecard Extractor');
  console.log('========================================');
  console.log(`Looking for .docx files in: ${ROOT}`);
  console.log('');

  // Scan for scorecard files
  let allFiles;
  try {
    allFiles = readdirSync(ROOT);
  } catch (err) {
    console.error(`✗ Could not read project root directory: ${err.message}`);
    process.exit(1);
  }

  const scorecardFiles = allFiles
    .filter((f) => f.toLowerCase().startsWith('councillor_scorecard_') && f.toLowerCase().endsWith('.docx'))
    .map((f) => join(ROOT, f));

  const comparisonFile = join(ROOT, 'Moncton_Council_Comparison_2021-2025.docx');
  const hasComparison = existsSync(comparisonFile);

  if (scorecardFiles.length === 0) {
    console.warn('⚠ No scorecard .docx files found.');
    console.warn('  Expected files matching: Councillor_Scorecard_<Name>.docx');
    console.warn('  Place them in the project root and re-run this script.');
    console.warn('');
    console.warn('  The councillors-extracted.json file will be written with an empty array.');
  } else {
    console.log(`Found ${scorecardFiles.length} scorecard file(s):`);
    scorecardFiles.forEach((f) => console.log(`  - ${basename(f)}`));
  }

  if (hasComparison) {
    console.log(`Found comparison document: Moncton_Council_Comparison_2021-2025.docx`);
  } else {
    console.log('(No comparison document found — optional)');
  }
  console.log('');

  // Process each scorecard
  const extracted = [];

  for (const filePath of scorecardFiles) {
    const result = await processScorecard(filePath);
    if (result) {
      extracted.push(result);
      console.log(`  ✓ ${result.name} — Overall GPA: ${result.overallGPA.toFixed(2)}`);
    }
  }

  // Write output JSON
  const output = {
    extractedAt: new Date().toISOString(),
    sourceFiles: scorecardFiles.map((f) => basename(f)),
    councillors: extracted,
  };

  try {
    writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2), 'utf8');
    console.log('');
    console.log(`✓ Wrote extracted data to: src/data/councillors-extracted.json`);
    console.log(`  ${extracted.length} councillor record(s) extracted.`);
  } catch (err) {
    console.error(`✗ Failed to write output file: ${err.message}`);
    process.exit(1);
  }

  console.log('');
  console.log('Next steps:');
  console.log('  1. Review src/data/councillors-extracted.json for accuracy.');
  console.log('  2. Update src/data/councillors.js with the extracted data, or');
  console.log('     modify your app to import from councillors-extracted.json directly.');
  console.log('  3. Restart the dev server: npm run dev');
  console.log('');
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
