# CSS Class Contract

Every theme MUST style every class below. Content pages, sub-layouts, and includes
depend on them and are NOT modified during redesigns. A redesign is incomplete if
any contract class is left unstyled — verify with a grep pass over the new
`main.css` before finishing.

## Required design tokens (in `main.css` `:root`)

```
--color-bg, --color-fg, --color-accent, --color-muted, --color-border
--font-display, --font-body, --font-mono
```

Both light AND dark schemes are required: define the default in `:root` and the
other under `@media (prefers-color-scheme: ...)`. Also set `<meta name="theme-color">`
via `color:` in `_data/theme.yml`.

## Layout shell (default.html, header.html, footer.html)

`.site-banner`, `.banner-text`, `.site-header`, `.site-title`, `.site-nav`,
`.nav-list`, `.nav-item`, `.site-main`, `.content-area`, `.site-footer`,
`.footer-grid`, `.footer-col`, `.footer-col-title`, `.social-list`

The banner text is data-driven from `_data/theme.yml` (design №, theme name) —
keep the Liquid logic, restyle/reposition freely.

## Homepage (home.html — redesign scope)

`.home`, `.hero`, `.hero-title`, `.hero-meta`, `.home-section`, `.section-header`,
`.section-label`, `.section-title`, `.app-list`, `.app-card`, `.app-icon`,
`.app-info`, `.app-name`, `.app-desc`, `.post-list`, `.post-row`, `.post-date`,
`.post-title`, `.view-all`, `.book-grid`, `.book-card`, `.book-card-author`,
`.book-card-title`, `.book-card-status`, `.book-card-cover` (cover `<img>`, may be absent)

Apps are looped from `site.apps` (front matter: `title`, `tagline`, `icon_path`,
`order`) — never hardcode app entries. App pages link out via `app_store_link`
("Download") or `website` ("Visit") — app.html renders whichever is present.
There are currently FOUR apps; don't assume three in constellation/showcase CSS.

## Articles (page.html, post.html, book.html, app.html — NOT redesign scope)

`.article`, `.article-header`, `.article-kicker`, `.article-title`,
`.article-description`, `.article-meta`, `.meta-item`, `.article-body`,
`.pull-quote`, `.pull-quote-mark`

## Reading page (reading.md)

`.reading-stats`, `.stat-item` (`data-stat`), `.stat-value`, `.stat-label`,
`.sort-controls`, `.sort-link`, `.book-list`, `.year-section` (`data-year`),
`.year-heading`

## Book items (book_item.html)

`.book-line` (`data-genre`, `data-rating`, `data-year`, `data-last-name`),
`.book-line-cover` (slot always rendered; `<img>` inside may be absent),
`.book-line-title`, `.book-line-author`, `.book-line-rating`, `.book-line-flag`

## Writing page (writing.md)

`.post-index`, `.post-index-row` (`data-index`, `data-year`, `data-topics`),
`.post-index-header`, `.post-index-title`, `.post-index-date`, `.post-index-desc`,
`.post-index-meta`, `.post-index-topic`

## Apps page (apps.md)

`.app-showcase`, `.app-showcase-card`, `.app-showcase-name`, `.app-showcase-detail`,
`.philosophy-section`, `.philosophy-heading`, `.philosophy-list`, `.philosophy-item`,
`.philosophy-title`, `.philosophy-desc`

## Archive page (archive.md)

`.archive-today` (`data-lane`), `.archive-today-label`, `.archive-today-theme`,
`.archive-today-manifesto`, `.archive-today-meta`, `.archive-meta-item`,
`.archive-palette` (contains `<i>` swatches with data-driven inline background —
the one allowed inline style), `.archive-controls`, `.archive-count`,
`.archive-surprise` (button), `.archive-gallery`, `.archive-card` (`data-lane`),
`.archive-card--lost`, `.archive-thumb`, `.archive-thumb img`,
`.archive-thumb-fallback`, `.archive-card-info`, `.archive-date`, `.archive-theme`,
`.archive-desc`

`assets/js/archive.js` drives the surprise button — stable, not redesign scope.

## App layout features (used inside app content)

`.feature-grid`, `.feature`, `.stack-grid`, `.stack-card`, `.stack-card-title`,
`.stack-card-count`

## Now page (now.md)

`.currently-reading`, `.reading-card`, `.reading-card-title`, `.reading-card-author`,
`.page-footer-note`

## 404 (404.html)

`.error-page`, `.error-code`, `.error-message`

## Content elements

`pre`, `code`, `blockquote`, `hr`, `::selection`, `:focus-visible`

## Stable assets themes can use

- `assets/images/monogram.svg` — TW monogram drawn in `currentColor`
- `assets/covers/<book-slug>.jpg` — book cover images (most books have one)
- `assets/etch_logo.png`, `assets/waymark_icon.png`, `assets/littleQuotes_icon.png`,
  `assets/yapware_logo.png` — app icons
- `assets/favicon.svg` — REPLACED by each theme to match its identity
