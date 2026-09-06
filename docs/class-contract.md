# Commonplace layout and behavior contract

The current design uses one reading column across the homepage, collection
indexes, articles, book notes, and app pages. Keep the light and dark color
schemes, readable muted text, visible keyboard focus, and narrow-screen layouts.
Structural wrappers do not need their own style when their children define the
layout. If changing templates, update this contract with them.

## Tokens and shell

`assets/css/main.css` defines `--color-bg`, `--color-fg`, `--color-accent`,
`--color-muted`, `--color-border`, `--font-display`, `--font-body`, and
`--font-mono`, plus surface and column-width tokens.

The shell uses `.site-header`, `.site-title`, `.site-nav`, `.site-main`,
`.content-area`, `.site-footer`, and `.footer-links`. The homepage identity is
in its introduction, so it does not repeat the interior-page header. The
footer contains plain text links in Email, GitHub, X, LinkedIn, RSS order,
with a visible keyboard focus underline. Design numbers and theme details belong
on the archive page and derive from `_data/theme.yml` and `_data/archive.yml`.
Do not edit historical archive data or snapshots as part of a redesign.

## Homepage and collection indexes

- `.intro`, `.intro-name`, `.intro-copy`: name and personal introduction.
- `.home-index`, `.index-tabs`, `.index-panel`, `.view-all`:
  three indexes below the introduction.
- `writing_list.html`: `.writing-list`, `.writing-year`, `.year-label`,
  `.post-list`, `.post-row`, `.post-title`, `.post-date`.
- `building_list.html`: `.app-list`, `.app-card`, `.app-icon`, `.app-info`,
  `.app-name`, `.app-desc`, `.row-arrow`. Apps come from `site.apps`, sorted by
  `order`; never hardcode the collection or assume a particular item count.
- `book_item.html`: `.book-line`, `.book-line-cover`, `.book-line-main`,
  `.book-line-title`, `.book-line-author`, `.book-line-meta`, `.book-line-rating`,
  `.book-line-flag`. Only books with nonblank notes are links. All books remain
  in the reading log. Keep the cover fallback and the reading-now status.
- Reading controls: `.library-controls`, `.library-search`, `.search-label`,
  `.search-icon`, `.search-clear`, `.library-options`, `.library-option-group`,
  `.library-option`, `.library-count`, `.empty-state`. Use plain text buttons
  for sorting and filtering, not a native dropdown. Search focus changes its
  bottom rule; keyboard focus underlines links and buttons. No green boxes.

`assets/js/main.js` enhances real collection links into accessible tabs. The
home states are `#writing`, `#reading`, and `#building`. Keep URL restoration,
browser Back, arrow/Home/End/Space keys, selected state, and a single tab stop.
One decorative `.tab-indicator` slides between selected tabs, matching their
position and width. Update its geometry when the tabs resize, including font
loading. Place it immediately on initial load and honor reduced-motion
preferences by disabling transitions.
Modified clicks retain ordinary link behavior. With JavaScript unavailable,
all three homepage sections and the complete reading log are visible.

The full bookshelf reads each row's `data-title`, `data-author`, `data-date`,
`data-rating`, and `data-notes`. Keep search, newest/rating/title/author sorts,
independent favorites and notes filters, a live result count, a clear-search
button, and the empty state. Sort and filter buttons expose `aria-pressed`.

The full Writing page uses `.writing-controls`, `.writing-search`, and
`.writing-count` with the same search field, clear button, and empty-state
styles. Only this page includes `data-article-search` text in writing rows;
the homepage stays small. Search includes titles, descriptions, topics, and
full article text, normalizes accents and punctuation once per row, and
requires every search word to match. Preserve chronological order, hide
empty year groups, and keep the complete list available without JavaScript.

WebMCP tools use the generated `/webmcp/articles.json` and
`/webmcp/book-notes.json` indexes independently of the page layout. Keep
`read_article`, `search_articles`, `read_book_notes`, and `search_book_notes`
registered as read-only tools. Article search uses the same fields and
all-word matching as Writing, ranks title and topic matches first, and
returns excerpts and URLs. Article reading and search share a cached index.

## Content layouts

Shared: `.article`, `.article-header`, `.article-kicker`, `.article-title`,
`.article-description`, `.article-meta`, `.article-body`, `.pull-quote`,
`.back-link`, and `.page-number`.

Published article headings retain Jekyll's generated IDs. JavaScript appends
a `.heading-anchor` to each body heading with an ID, preserving its text and
any existing links. Position the permalink in the left margin, aligned with
the heading's first line. The small permalink stays hidden until the heading is
clicked, hovered on a desktop pointer, or its link receives keyboard focus.
Clicking elsewhere hides the selected link. Use native fragment navigation
and a scroll margin so shared section URLs work without JavaScript too.

The Writing, Reading, and Building indexes set `show_description: false` to
keep their headings plain while retaining descriptions in page metadata.

Books: `.book-header`, `.book-cover`, `.book-byline`.
Book pages use the main header's Reading link without repeating it above or
below the book details.
Apps: `.app-header`, `.app-detail-icon`, `.app-links`.
App destinations continue to use `app_store_link` or `website` frontmatter.

Keep styles for embedded content:

- `.feature-grid`, `.feature-card`, `.feature`.
- `.screenshot-strip`, `.screenshot-card`: horizontally scrollable screenshots.
- `.stack-grid`, `.stack-card`, `.stack-card-header`, `.stack-card-title`,
  `.stack-card-count`, `.stack-card-download-icon`: downloadable Etch stacks.
- `.callout`, `.currently-reading`, `.reading-card`, `.reading-card-title`,
  `.reading-card-author`, `.page-footer-note`.
- `.error-page`, `.error-code`, `.error-message`.
- Headings, lists, tables, images, blockquotes, code, preformatted text, and rules.

## Archive

Keep `.archive-today`, `.archive-today-label`, `.archive-today-theme`,
`.archive-today-manifesto`, `.archive-today-meta`, `.archive-meta-item`,
`.archive-palette`, `.archive-controls`, `.archive-count`, `.archive-surprise`,
`.archive-gallery`, `.archive-card`, `.archive-card--lost`, `.archive-thumb`,
`.archive-thumb-fallback`, `.archive-card-info`, `.archive-date`,
`.archive-theme`, and `.archive-desc` usable at phone and desktop widths.
`assets/js/archive.js` continues to drive the random-design link.

## Verification

Build with `bundle exec jekyll build`. Check the browser at desktop and phone
widths, including tabs, Back/reload, search/filters, article/book/app content,
and the archive. Confirm no horizontal page overflow or browser errors.
Run `WEBMCP_BUILD_DIR=_site node --test test/webmcp.test.js` to verify the
reading/search tools and generated content indexes after layout changes.
