#!/usr/bin/env bash
set -euo pipefail

# build_snapshot.sh — Build a single archive snapshot
# Usage: ./scripts/build_snapshot.sh <commit> <date> <theme> [prev_date] [next_date]
# Example: ./scripts/build_snapshot.sh 950d6b36 2026-02-04 "NEUBRUTALISM" "" "2026-02-05"

COMMIT="${1:?Usage: build_snapshot.sh <commit> <date> <theme> [prev_date] [next_date]}"
DATE="${2:?Usage: build_snapshot.sh <commit> <date> <theme> [prev_date] [next_date]}"
THEME="${3:?Usage: build_snapshot.sh <commit> <date> <theme> [prev_date] [next_date]}"
PREV_DATE="${4:-}"
NEXT_DATE="${5:-}"

REPO_ROOT="$(git rev-parse --show-toplevel)"
ARCHIVE_DIR="${REPO_ROOT}/archive/${DATE}"
WORKTREE_DIR="/tmp/archive-worktree-${DATE}"
BASEURL="/archive/${DATE}"

echo "==> Building snapshot: ${THEME} (${DATE}) from ${COMMIT}"

# Clean up any previous worktree at this path
if [ -d "${WORKTREE_DIR}" ]; then
  git -C "${REPO_ROOT}" worktree remove --force "${WORKTREE_DIR}" 2>/dev/null || rm -rf "${WORKTREE_DIR}"
fi

# Create worktree at the target commit
git -C "${REPO_ROOT}" worktree add "${WORKTREE_DIR}" "${COMMIT}" --detach

# Build the site in the worktree
echo "==> Installing dependencies..."
cd "${WORKTREE_DIR}"
bundle install --quiet

echo "==> Building Jekyll with baseurl=${BASEURL}..."
JEKYLL_ENV=production bundle exec jekyll build --baseurl "${BASEURL}" --destination "${WORKTREE_DIR}/_site"

# Create the archive directory
rm -rf "${ARCHIVE_DIR}"
mkdir -p "${ARCHIVE_DIR}"

# Copy only HTML, CSS, and JS (skip images — they load from main site /assets/)
echo "==> Copying HTML, CSS, JS to ${ARCHIVE_DIR}..."
cd "${WORKTREE_DIR}/_site"
find . -type f \( -name "*.html" -o -name "*.css" -o -name "*.js" -o -name "*.xml" -o -name "*.json" \) | while read -r file; do
  target_dir="${ARCHIVE_DIR}/$(dirname "${file}")"
  mkdir -p "${target_dir}"
  cp "${file}" "${target_dir}/"
done

# Fix hardcoded absolute paths in HTML files
# Convert href="/something/" to href="/archive/DATE/something/"
# but leave href="/assets/" and href="/archive/" alone (images load from main site)
echo "==> Fixing hardcoded paths in HTML..."
find "${ARCHIVE_DIR}" -name "*.html" -type f | while read -r htmlfile; do
  # Fix href="/path/" links (but not /assets/ or /archive/ or external URLs)
  sed -i '' \
    -e "s|href=\"/apps/|href=\"${BASEURL}/apps/|g" \
    -e "s|href=\"/writing/|href=\"${BASEURL}/writing/|g" \
    -e "s|href=\"/reading/|href=\"${BASEURL}/reading/|g" \
    -e "s|href=\"/now/|href=\"${BASEURL}/now/|g" \
    -e "s|href=\"/books/|href=\"${BASEURL}/books/|g" \
    -e "s|href=\"/etch/|href=\"${BASEURL}/etch/|g" \
    -e "s|href=\"/waymark/|href=\"${BASEURL}/waymark/|g" \
    -e "s|href=\"/20|href=\"${BASEURL}/20|g" \
    "${htmlfile}"

  # Fix the site title link (href="/" but not href="/a..." etc.)
  sed -i '' "s|href=\"/\"|href=\"${BASEURL}/\"|g" "${htmlfile}"
done

# Build prev/next nav elements
PREV_NAV=""
if [ -n "${PREV_DATE}" ]; then
  PREV_NAV='<a href="/archive/'"${PREV_DATE}"'/" style="color:rgba(255,255,255,0.5);text-decoration:none;font-weight:500;transition:color 0.2s;">← '"${PREV_DATE}"'</a>'
else
  PREV_NAV='<span style="visibility:hidden;">← 0000-00-00</span>'
fi

NEXT_NAV=""
if [ -n "${NEXT_DATE}" ]; then
  NEXT_NAV='<a href="/archive/'"${NEXT_DATE}"'/" style="color:rgba(255,255,255,0.5);text-decoration:none;font-weight:500;transition:color 0.2s;">'"${NEXT_DATE}"' →</a>'
else
  NEXT_NAV='<span style="visibility:hidden;">0000-00-00 →</span>'
fi

# Inject time-travel banner into every HTML file
echo "==> Injecting time-travel banner..."
BANNER_HTML='<!-- Time Travel Banner --><div style="position:fixed;top:0;left:0;right:0;z-index:9999;background:#111;color:rgba(255,255,255,0.7);text-align:center;padding:6px 20px;font-family:ui-monospace,SFMono-Regular,SF Mono,Menlo,monospace;font-size:11.5px;font-weight:500;letter-spacing:0.03em;display:flex;align-items:center;justify-content:space-between;">'"${PREV_NAV}"'<span>'"${THEME}"' · '"${DATE}"' · <a href="/archive/" style="color:rgba(255,255,255,0.5);text-decoration:none;font-weight:500;transition:color 0.2s;">Back to today'\''s site →</a></span>'"${NEXT_NAV}"'</div><div style="height:32px;"></div>'

find "${ARCHIVE_DIR}" -name "*.html" -type f | while read -r htmlfile; do
  # Insert banner right after <body> tag
  sed -i '' "s|<body>|<body>${BANNER_HTML}|g" "${htmlfile}"
  sed -i '' 's|<body |<body data-archived="true" |g' "${htmlfile}"
done

# Remove the "TODAY'S LOOK" badge from archived pages
echo "==> Removing TODAY'S LOOK badge..."
find "${ARCHIVE_DIR}" -name "*.html" -type f | while read -r htmlfile; do
  # Remove the daily-design-badge div block
  sed -i '' '/<div class="daily-design-badge">/,/<\/div>/{ /<div class="daily-design-badge">/,/<\/div>/{
    /daily-design-badge/d
    /daily-design-label/d
    /daily-design-tooltip/d
    /TODAY'\''S LOOK/d
    /restyled by AI/d
    /bold.*weird/d
    /tooltip-cta/d
    /Come back tomorrow/d
    /Browse past designs/d
  }; }' "${htmlfile}"

  # Hide badge and offset sticky header to account for fixed banner
  sed -i '' 's|</head>|<style>.daily-design-badge,.ai-design-banner{display:none!important;}.site-header{top:32px!important;}</style></head>|' "${htmlfile}"
done

# Clean up worktree
echo "==> Cleaning up worktree..."
cd "${REPO_ROOT}"
git worktree remove --force "${WORKTREE_DIR}" 2>/dev/null || rm -rf "${WORKTREE_DIR}"

echo "==> Done! Snapshot for ${DATE} (${THEME}) is at ${ARCHIVE_DIR}"
