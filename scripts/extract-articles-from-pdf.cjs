const fs = require('fs');
const path = require('path');
const pdfParseModule = require('pdf-parse');
const PDFParse = pdfParseModule.PDFParse || pdfParseModule.default;
if (!PDFParse) throw new Error('PDFParse not found. Keys: ' + Object.keys(pdfParseModule).join(', '));

const ARTICLES_DIR = path.join(__dirname, '..', 'public', 'articles');

const MAP = [
  { file: 'Article 1 (40 Ethics of Rasulluah SAW).pdf', slug: '40-ethics-of-rasulullah', title: '40 Ethics of Rasulullah ﷺ', tag: 'Faith & Character' },
  { file: 'Article 2 (Life after Death in Islam).pdf', slug: 'life-after-death-in-islam', title: 'Life after Death in Islam', tag: 'Aqeedah' },
  { file: 'Article 3 Ramadan Checklist and planner.pdf', slug: 'ramadan-checklist-and-planner', title: 'Ramadan Checklist and Planner', tag: 'Ramadan' },
  { file: 'Article 4 Life after loss.pdf', slug: 'life-after-loss', title: 'Life After Loss', tag: 'Healing' },
  { file: 'Article 5 Restoring Dignity.pdf', slug: 'restoring-dignity', title: 'Restoring Dignity', tag: 'Widows' },
  { file: 'Article 6 From Dependency to Independence.pdf', slug: 'from-dependency-to-independence', title: 'From Dependency to Independence', tag: 'Empowerment' },
  { file: 'Article 7 The Silent Struggle of Widows.pdf', slug: 'the-silent-struggle-of-widows', title: 'The Silent Struggle of Widows', tag: 'Widows' },
  { file: 'Article 8 Emotional Healing for Widows.pdf', slug: 'emotional-healing-for-widows', title: 'Emotional Healing for Widows', tag: 'Healing' },
  { file: 'Article 9 How Community Support.pdf', slug: 'how-community-support-helps', title: 'How Community Support Helps', tag: 'Community' },
  { file: 'Article 10 Education as a Second Chance.pdf', slug: 'education-as-a-second-chance', title: 'Education as a Second Chance', tag: 'Education' },
  { file: 'Article 11 Breaking Social Stigma.pdf', slug: 'breaking-social-stigma', title: 'Breaking Social Stigma', tag: 'Community' },
  { file: 'Article 12 Sustainable Livelihoods for Widows.pdf', slug: 'sustainable-livelihoods-for-widows', title: 'Sustainable Livelihoods for Widows', tag: 'Widows' },
  { file: 'Article 13 Stories of Strength.pdf', slug: 'stories-of-strength', title: 'Stories of Strength', tag: 'Stories' },
];

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Split long body into readable paragraphs (by sentence, max length)
function splitIntoParas(text, maxLen = 380) {
  const out = [];
  const sentences = text.match(/[^.!?]+[.!?]+(?=\s|$)|[^.!?]+/g) || [text];
  let current = '';
  for (const s of sentences) {
    const t = s.trim();
    if (!t) continue;
    if (current.length + t.length + 1 <= maxLen) current = current ? current + ' ' + t : t;
    else {
      if (current) out.push({ type: 'p', text: current });
      current = t;
    }
  }
  if (current) out.push({ type: 'p', text: current });
  return out;
}

// From a segment like "His Supreme Virtues and Qualities Rasulullah's knowledge...", extract heading phrase and body
function splitHeadingAndBody(segment) {
  const m = segment.match(/^([A-Z][^.!?]*?)(?=\s+(?:Rasulullah'?s?|He\s|She\s|They\s|When\s|If\s|After\s|Before\s|During\s|For\s+many|In\s+many|The\s+[a-z]|[A-Z][a-z]+'s\s|\.\s))/);
  if (m) {
    const title = m[1].trim();
    if (title.length >= 5 && title.length <= 80) return { title, rest: segment.slice(m[0].length).trim() };
  }
  const m2 = segment.match(/^([A-Z][^.!?]{4,70}?)(?=\s+[A-Z][a-z])/);
  if (m2) return { title: m2[1].trim(), rest: segment.slice(m2[0].length).trim() };
  return null;
}

// Standalone short line (no period) = section title (e.g. "Widowhood and Interrupted Learning Journeys")
function isStandaloneHeading(line) {
  const t = line.trim();
  if (!t || t.length < 12 || t.length > 85) return false;
  if (/[.!?]$/.test(t)) return false;
  if (/^\(|^["']|^\d+\./m.test(t)) return false;
  if (t.split(/\s+/).filter(Boolean).length < 2) return false;
  return true;
}

function textToBodyHtml(text) {
  if (!text || !text.trim()) return '<p>No text extracted.</p>';
  let cleaned = text.trim()
    .replace(/\n?\s*--\s*\d+\s+of\s+\d+\s*--\s*\n?/gi, '\n\n');
  const out = [];
  const maxParaLen = 380;

  // 1) Try numbered-structure (e.g. 40 Ethics: "1. Title" then body). Split by " N. " so we keep number with segment.
  const normalized = cleaned.replace(/\n+/g, ' ').replace(/\s+/g, ' ').trim();
  const parts = normalized.split(/(\d+\.\s+)/);
  if (parts.length >= 3) {
    const intro = parts[0].trim();
    if (intro) {
      if (intro.length <= maxParaLen) out.push({ type: 'p', text: intro });
      else out.push(...splitIntoParas(intro, maxParaLen));
    }
    for (let i = 1; i < parts.length; i += 2) {
      const num = parts[i];
      const seg = (parts[i + 1] || '').trim();
      if (!seg) continue;
      const split = splitHeadingAndBody(seg);
      if (split) {
        out.push({ type: 'h2', text: num + split.title });
        if (split.rest) {
          if (split.rest.length <= maxParaLen) out.push({ type: 'p', text: split.rest });
          else out.push(...splitIntoParas(split.rest, maxParaLen));
        }
      } else {
        if (seg.length <= maxParaLen) out.push({ type: 'p', text: seg });
        else out.push(...splitIntoParas(seg, maxParaLen));
      }
    }
    return out.map((el) => (el.type === 'h2' ? `<h2>${escapeHtml(el.text)}</h2>` : `<p>${escapeHtml(el.text)}</p>`)).join('\n');
  }

  // 2) Block-based: double-newline blocks; single-line short = h2, else paragraphs
  const blocks = cleaned.split(/\n\s*\n/).map((b) => b.trim()).filter(Boolean);
  for (const block of blocks) {
    const singleLine = !/\n/.test(block);
    const blockText = block.replace(/\n+/g, ' ').replace(/\s+/g, ' ').trim();
    if (!blockText) continue;
    if (singleLine && isStandaloneHeading(blockText)) {
      out.push({ type: 'h2', text: blockText });
    } else {
      if (blockText.length <= maxParaLen) out.push({ type: 'p', text: blockText });
      else out.push(...splitIntoParas(blockText, maxParaLen));
    }
  }

  return out.map((el) => (el.type === 'h2' ? `<h2>${escapeHtml(el.text)}</h2>` : `<p>${escapeHtml(el.text)}</p>`)).join('\n');
}

function buildHtml(entry, bodyHtml) {
  const tagEsc = escapeHtml(entry.tag);
  const titleEsc = escapeHtml(entry.title);
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${titleEsc} | Two Finger Foundation</title>
  <meta name="description" content="${titleEsc} — Two Finger Foundation." />
  <link rel="stylesheet" href="article-style.css" />
</head>
<body>
  <article class="article-page">
    <a href="/articles" class="article-back" target="_top" rel="noopener" onclick="var w=window.top||window;if(w.history.length>1){event.preventDefault();w.history.back();}">Back</a>
    <header class="article-header">
      <span class="article-tag">${tagEsc}</span>
      <h1 class="article-title">${titleEsc}</h1>
      <p class="article-meta">Two Finger Foundation</p>
    </header>
    <div class="article-body">
${bodyHtml}
    </div>
  </article>
  <script>(function(){ if(window.self !== window.top) { var b = document.querySelector('.article-back'); if(b) b.style.display = 'none'; } })();</script>
</body>
</html>
`;
}

async function main() {
  for (const entry of MAP) {
    const pdfPath = path.join(ARTICLES_DIR, entry.file);
    if (!fs.existsSync(pdfPath)) {
      console.warn('Skip (no PDF):', entry.file);
      continue;
    }
    const buf = fs.readFileSync(pdfPath);
    const parser = new PDFParse({ data: buf });
    const result = await parser.getText();
    await parser.destroy();
    const bodyHtml = textToBodyHtml(result.text);
    const html = buildHtml(entry, bodyHtml);
    const outPath = path.join(ARTICLES_DIR, `${entry.slug}.html`);
    fs.writeFileSync(outPath, html, 'utf8');
    console.log('Written:', entry.slug + '.html');
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
