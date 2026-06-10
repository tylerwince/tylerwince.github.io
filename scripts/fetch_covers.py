#!/usr/bin/env python3
"""fetch_covers.py — download book cover images from Open Library.

For each _books/<slug>.md, looks up the book by title+author on the Open
Library search API and saves the cover to assets/covers/<slug>.jpg (skipping
slugs that already have one). Safe to re-run; failures just leave a gap, and
templates fall back gracefully when no cover file exists.
"""

import json
import os
import re
import sys
import time
import urllib.parse
import urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BOOKS_DIR = os.path.join(ROOT, "_books")
COVERS_DIR = os.path.join(ROOT, "assets", "covers")
UA = {"User-Agent": "tylerwince.com cover fetcher (me@tylerwince.com)"}


def front_matter_field(text, field):
    m = re.search(rf'^{field}:\s*["\']?(.+?)["\']?\s*$', text, re.MULTILINE)
    return m.group(1).strip() if m else None


def main():
    os.makedirs(COVERS_DIR, exist_ok=True)
    missing = []
    for fname in sorted(os.listdir(BOOKS_DIR)):
        if not fname.endswith(".md"):
            continue
        slug = fname[:-3]
        out = os.path.join(COVERS_DIR, slug + ".jpg")
        if os.path.exists(out):
            continue
        with open(os.path.join(BOOKS_DIR, fname)) as f:
            text = f.read()
        title = front_matter_field(text, "title")
        author = front_matter_field(text, "author")
        if not title:
            missing.append(slug)
            continue
        params = {"title": title, "limit": "1", "fields": "cover_i,title"}
        if author:
            params["author"] = author
        url = "https://openlibrary.org/search.json?" + urllib.parse.urlencode(params)
        try:
            req = urllib.request.Request(url, headers=UA)
            with urllib.request.urlopen(req, timeout=20) as resp:
                data = json.load(resp)
            docs = data.get("docs") or []
            cover_i = docs[0].get("cover_i") if docs else None
            if not cover_i and author:
                # retry title-only; author strings often don't match exactly
                params.pop("author")
                url = "https://openlibrary.org/search.json?" + urllib.parse.urlencode(params)
                req = urllib.request.Request(url, headers=UA)
                with urllib.request.urlopen(req, timeout=20) as resp:
                    data = json.load(resp)
                docs = data.get("docs") or []
                cover_i = docs[0].get("cover_i") if docs else None
            if not cover_i:
                missing.append(slug)
                print(f"--  no cover found: {slug}")
                continue
            img_url = f"https://covers.openlibrary.org/b/id/{cover_i}-L.jpg"
            req = urllib.request.Request(img_url, headers=UA)
            with urllib.request.urlopen(req, timeout=30) as resp:
                blob = resp.read()
            if len(blob) < 1000:  # 1x1 placeholder = no real cover
                missing.append(slug)
                print(f"--  placeholder only: {slug}")
                continue
            with open(out, "wb") as f:
                f.write(blob)
            print(f"==> {slug}.jpg ({len(blob) // 1024} KB)")
        except Exception as e:  # network hiccups shouldn't kill the run
            missing.append(slug)
            print(f"!!  error for {slug}: {e}", file=sys.stderr)
        time.sleep(1)
    if missing:
        print(f"\n{len(missing)} without covers: {', '.join(missing)}")


if __name__ == "__main__":
    main()
