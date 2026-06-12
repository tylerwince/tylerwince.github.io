# og_cards.rb — generate one Open Graph card page per blog post.
#
# Each post gets a page at /og-cards/<slug>/ that renders its title in the
# current theme (see _layouts/og_card.html). CI screenshots each card at
# 1200x630 into /assets/og/posts/<slug>.png (scripts/capture_screenshots.sh
# `ogcards` mode), and _layouts/default.html points each post's og:image at
# its own card. Because the card reads _data/theme.yml, cards restyle with
# every daily redesign.
#
# We run a real `bundle exec jekyll build` (not the GitHub Pages safe gem), so
# this plugin loads on both local and CI builds.
module OgCards
  class Generator < Jekyll::Generator
    safe true
    priority :low

    def generate(site)
      site.posts.docs.each do |post|
        slug = post.data["slug"] ||
               post.basename_without_ext.sub(/^\d{4}-\d{2}-\d{2}-/, "")
        site.pages << CardPage.new(site, slug, post)
      end
    end
  end

  class CardPage < Jekyll::Page
    def initialize(site, slug, post)
      @site = site
      @base = site.source
      @dir  = File.join("og-cards", slug)
      @name = "index.html"
      process(@name)
      @data = {
        "layout"    => "og_card",
        "sitemap"   => false,
        "card_slug" => slug,
        "card_date" => post.date,
        "title"     => post.data["title"],
      }
    end
  end
end
