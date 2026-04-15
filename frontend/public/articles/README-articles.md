# Article HTML pages (written form)

Articles can be in **written form** as standalone HTML files for better SEO. Each file is a full page with its own URL (e.g. `/articles/40-ethics-of-rasulullah.html`).

## How to add a new article

1. **Create an HTML file** in this folder (`public/articles/`) with a URL-friendly name, e.g. `life-after-death-in-islam.html`.

2. **Use the same structure** as `40-ethics-of-rasulullah.html`:
   - Copy that file and rename it.
   - Change `<title>`, `<meta name="description">`, the tag, the `<h1>` title, and the `.article-body` content.
   - Keep the link to `article-style.css` and the "Back to Articles" link.

3. **Register the article** in the app: open `src/pages/ArticlesPage.tsx`, find the `ARTICLES` array, and add `htmlSlug: 'your-file-name'` to the matching article (same as the filename without `.html`). Example: for `life-after-death-in-islam.html` add `htmlSlug: 'life-after-death-in-islam'`.

## Slug list (for reference)

- `40-ethics-of-rasulullah` ✓ (sample done)
- `life-after-death-in-islam`
- `ramadan-checklist-and-planner`
- `life-after-loss`
- `restoring-dignity`
- `from-dependency-to-independence`
- `the-silent-struggle-of-widows`
- `emotional-healing-for-widows`
- `how-community-support-helps`
- `education-as-a-second-chance`
- `breaking-social-stigma`
- `sustainable-livelihoods-for-widows`
- `stories-of-strength`

## What the client needs to provide

For each article: the **written content** (text or simple HTML: headings, paragraphs, lists). You can then paste it into the `.article-body` section of the HTML file.
