# Website Redesign Roadmap

## Vision
Transform tylerwince.com from a simple blog into a comprehensive showcase for apps (Etch & Waymark), writing, and reading—creating an engaging personal brand hub.

---

## Phase 1: App Showcase Foundation ✅
**Goal:** Make Etch and Waymark visible and prominent

- [x] Create `_apps/` collection in `_config.yml`
- [x] Create `/apps/index.md` - App portfolio overview page
- [x] Create `_apps/etch.md` - Full Etch showcase page
  - [x] What it does (3-sentence pitch)
  - [x] Key features section
  - [ ] Screenshots/visuals
  - [x] Download/access links
  - [x] Technical approach
  - [x] Related blog posts
- [x] Create `_apps/waymark.md` - Full Waymark showcase page
  - [x] What it does (3-sentence pitch)
  - [x] Key features section
  - [ ] Screenshots/visuals
  - [x] Download/access links
  - [x] Technical approach
  - [x] Related blog posts
- [x] Create `_layouts/app.html` - Custom layout for app pages
- [ ] Add app screenshots to `/assets/` folder
- [x] Move privacy policies into app pages (instead of separate collections)

---

## Phase 2: Homepage Transformation ✅
**Goal:** Create a hero-driven landing page that showcases everything

- [x] Redesign `index.md` with hero section
  - [x] Bold headline/tagline
  - [x] Subheading about what you do
- [x] Featured Apps section
  - [x] Etch card with screenshot + link
  - [x] Waymark card with screenshot + link
- [x] Recent Highlights section
  - [x] Latest blog post
  - [x] Current book reading link
- [x] Clear CTAs
  - [x] "See my apps"
  - [x] "Read my writing"
  - [x] "Browse my library"
- [x] Add custom CSS for homepage layout

---

## Phase 3: Writing Hub Enhancement ✅
**Goal:** Organize writing content better with filtering and organization

- [x] Rename/rebrand blog section to "Writing"
- [x] Create `/writing/index.md` - Writing hub page
- [x] Add frontmatter categories to posts
  - [x] Product
  - [x] Technology
  - [x] Frameworks
  - [x] Leadership
- [x] Implement filtering by category (JavaScript)
- [x] Add reading time estimates to posts (auto-calculated)
- [x] Create card-based layout for posts
- [x] Update homepage to link to /writing/
- [ ] Add related content suggestions at bottom of posts (future enhancement)
- [ ] Create featured/pinned posts section (future enhancement)

---

## Phase 4: Reading Section Polish ✅
**Goal:** Enhance the already-great reading section with better organization

- [x] Create "Favorites" quick-link (5-star books)
- [x] Add "Books with Notes" quick-link
- [x] Add topic/genre filtering
  - [x] Leadership
  - [x] Technology
  - [x] Philosophy
  - [x] Religion
  - [x] Business
  - [x] Science
  - [x] Climate
  - [x] Biography
  - [x] Fiction
- [x] Add reading stats widget
  - [x] Total books
  - [x] Books since 2023
  - [x] Five-star books count
- [x] Add genre tags to sample books (6 books tagged)
- [x] Update book_item.html to support genre data attributes
- [x] Improve visual design with stat cards and filter buttons
- [ ] Add "Reading Now" section (future: requires currently-reading data structure)

---

## Phase 5: Navigation & Structure ✅
**Goal:** Clearer site navigation and information architecture

- [x] Update site navigation in `_config.yml`
  - [x] Apps
  - [x] Writing
  - [x] Reading
  - [x] About
- [x] Update site description to reflect new structure
- [x] Clean navigation order (Home is automatic, removed old blog-focused pages)
- [ ] Add dropdown for Apps (future: requires custom header override)
- [ ] Update site footer with better link organization (future enhancement)
- [ ] Add breadcrumbs where appropriate (future enhancement)
- [ ] Ensure mobile navigation works well (Minima handles this automatically)

---

## Phase 6: Visual Design Overhaul ✅
**Goal:** Move beyond stock Minima theme to something distinctive

- [x] Create comprehensive design system with CSS variables
  - [x] Spacing scale (8px base, 1-24 steps)
  - [x] Typography scale (xs to 6xl)
  - [x] Color palette (primary, text, background, borders)
  - [x] Border radius values
  - [x] Box shadows
  - [x] Transitions
- [x] Define reusable component classes
  - [x] Cards with hover effects
  - [x] Buttons (primary, secondary, sizes)
  - [x] Stat cards
  - [x] Filter buttons
  - [x] Grid layouts
- [x] Update homepage with design system
- [x] Update apps page with design system
- [x] Establish consistent spacing and alignment throughout
- [ ] Update writing page with design system (future)
- [ ] Update reading page with design system (future)
  - [ ] Choose distinctive heading fonts
  - [ ] Better heading hierarchy
  - [ ] Improved body text readability
- [ ] Add explicit dark mode toggle
- [ ] Create grid layouts for featured content
- [ ] Add app screenshots and high-quality images
- [ ] Design custom homepage hero section
- [ ] Style app showcase cards
- [ ] Polish reading section aesthetics
- [ ] Add subtle animations/transitions

---

## Phase 7: Content Interconnections
**Goal:** Link related content across the site

- [ ] Tag blog posts related to apps
- [ ] Add "From the blog" sections on app pages
- [ ] Add "What I'm reading" widget on homepage
- [ ] Create related book tags for posts
- [ ] Add cross-references between related posts
- [ ] Link books to related blog posts where relevant
- [ ] Add "Related reading" to app pages

---

## Phase 8: About Page Enhancement
**Goal:** Make About page more personal and engaging

- [ ] Add personal photo
- [ ] Rewrite with personal story (why you build things)
- [ ] Showcase apps you've shipped
- [ ] Feature books that influenced you
- [ ] Make contact/social links more prominent
- [ ] Add "What I'm working on now" section
- [ ] Balance professional (Myndshft CPO) with personal projects
- [ ] Add timeline or journey section

---

## Phase 9: Polish & Performance
**Goal:** Final touches and optimization

- [ ] Optimize images (compress screenshots)
- [ ] Test mobile responsiveness on all pages
- [ ] Ensure accessibility (alt text, contrast, keyboard nav)
- [ ] Test dark mode on all pages
- [ ] Add meta descriptions to all pages
- [ ] Update OpenGraph/social sharing images
- [ ] Test load times and optimize
- [ ] Cross-browser testing
- [ ] Fix any broken links
- [ ] Update RSS feed if structure changed
- [ ] Review analytics setup

---

## Phase 10: Content Refresh
**Goal:** Update and add content to support new structure

- [ ] Write app case studies for Etch and Waymark
- [ ] Update existing posts with better tags/categories
- [ ] Add missing book reviews for stub entries
- [ ] Create any missing "reading now" content
- [ ] Write new "About" content
- [ ] Create hero images for app pages
- [ ] Add testimonials/reviews for apps (if available)
- [ ] Update professional info in About

---

## Future Enhancements (Nice-to-Have)

- [ ] Newsletter signup
- [ ] Comments on blog posts (if desired)
- [ ] Search functionality
- [ ] Reading stats dashboard
- [ ] App analytics/downloads counter
- [ ] Testimonials section
- [ ] Projects timeline
- [ ] RSS feed for book reviews
- [ ] JSON API for reading list
- [ ] Dark/light mode preference persistence
- [ ] Automated book import from Goodreads/similar

---

## Success Metrics

**Before:**
- Apps hidden in privacy policy collections
- Generic blog layout
- No clear value proposition
- Minimal visual design

**After:**
- Apps prominently featured with dedicated pages
- Organized writing hub with filtering
- Clear personal brand and value proposition
- Distinctive visual design
- Interconnected content ecosystem
- Professional portfolio + personal blog hybrid

---

## Notes

- Currently on `redesign` branch
- Main branch is `main`
- Using Jekyll ~4.3.1 with Minima theme
- Hosted on GitHub Pages at tylerwince.com
- Has 79 books, 15 blog posts, 2 apps to showcase
- Existing automation scripts: `create_post.rb`, `create_book_review.rb`

---

**Last Updated:** 2025-11-04
**Status:** Planning Phase
