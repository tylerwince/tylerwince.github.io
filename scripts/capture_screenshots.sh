#!/usr/bin/env bash
set -euo pipefail

# capture_screenshots.sh — screenshot helper for the design archive.
#
# Usage:
#   scripts/capture_screenshots.sh backfill              # thumb.png for every archive/<date>/ missing one
#   scripts/capture_screenshots.sh thumb <date>          # thumb.png for one snapshot (serves repo root)
#   scripts/capture_screenshots.sh shot <docroot> <urlpath> <outfile> [WxH] [wait_ms]
#
# Thumbnails are 1200x800 viewport shots of the snapshot homepage. The OG image
# for today's design is taken by CI via the `shot` mode at 1200x630.
#
# Requires: python3 (static server), npx + playwright (browser). The wait gives
# load animations (e.g. split-flap scramble) time to settle.

PLAYWRIGHT_VERSION="${PLAYWRIGHT_VERSION:-1.58.0}"
PORT="${PORT:-8941}"
REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"

serve() {
  local docroot="$1"
  python3 -m http.server "${PORT}" --directory "${docroot}" >/dev/null 2>&1 &
  SERVER_PID=$!
  trap 'kill ${SERVER_PID} 2>/dev/null || true' EXIT
  # wait for the server to accept connections
  for _ in $(seq 1 30); do
    if curl -sf "http://127.0.0.1:${PORT}/" >/dev/null 2>&1; then return 0; fi
    sleep 0.2
  done
  echo "Static server failed to start" >&2
  exit 1
}

shoot() {
  local urlpath="$1" outfile="$2" size="${3:-1200,800}" wait_ms="${4:-4500}"
  mkdir -p "$(dirname "${outfile}")"
  npx -y "playwright@${PLAYWRIGHT_VERSION}" screenshot \
    --browser=chromium \
    --viewport-size="${size}" \
    --wait-for-timeout="${wait_ms}" \
    "http://127.0.0.1:${PORT}${urlpath}" \
    "${outfile}"
  echo "==> wrote ${outfile}"
}

case "${1:-}" in
  backfill)
    serve "${REPO_ROOT}"
    for dir in "${REPO_ROOT}"/archive/*/; do
      date_name="$(basename "${dir}")"
      [[ "${date_name}" =~ ^[0-9]{4}-[0-9]{2}-[0-9]{2}$ ]] || continue
      [[ -f "${dir}/index.html" ]] || continue
      if [[ -f "${dir}/thumb.png" ]]; then
        echo "==> skip ${date_name} (thumb exists)"
        continue
      fi
      shoot "/archive/${date_name}/" "${dir}/thumb.png"
    done
    ;;
  thumb)
    DATE="${2:?Usage: capture_screenshots.sh thumb <date>}"
    serve "${REPO_ROOT}"
    shoot "/archive/${DATE}/" "${REPO_ROOT}/archive/${DATE}/thumb.png"
    ;;
  shot)
    DOCROOT="${2:?Usage: capture_screenshots.sh shot <docroot> <urlpath> <outfile> [WxH] [wait_ms]}"
    URLPATH="${3:?missing urlpath}"
    OUTFILE="${4:?missing outfile}"
    SIZE="${5:-1200,800}"
    WAIT="${6:-4500}"
    serve "${DOCROOT}"
    shoot "${URLPATH}" "${OUTFILE}" "${SIZE}" "${WAIT}"
    ;;
  *)
    echo "Usage: capture_screenshots.sh backfill | thumb <date> | shot <docroot> <urlpath> <outfile> [WxH] [wait_ms]" >&2
    exit 1
    ;;
esac
