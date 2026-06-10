#!/usr/bin/env ruby
# update_archive_manifest.rb — append today's design to _data/archive.yml,
# pulling rich metadata (manifesto, lane, palette, fonts...) from _data/theme.yml,
# which every redesign rewrites. Run by CI on Redesign: commits.
#
# Usage: ruby scripts/update_archive_manifest.rb <date> <theme-name> <commit>

require 'yaml'
require 'date'

date, theme_name, commit = ARGV
abort 'Usage: update_archive_manifest.rb <date> <theme-name> <commit>' unless commit

manifest = File.exist?('_data/theme.yml') ? YAML.load_file('_data/theme.yml') : {}
archive  = File.exist?('_data/archive.yml') ? (YAML.load_file('_data/archive.yml', permitted_classes: [Date]) || []) : []

# Unquoted YAML dates parse as Date objects; keep everything a string.
archive.each { |e| e['date'] = e['date'].to_s }

entry = {
  'date'        => date,
  'theme'       => manifest['name'] || theme_name,
  'description' => manifest['manifesto'] ||
                   "#{theme_name} — designed #{Date.parse(date).strftime('%B %d, %Y')}",
  'commit'      => commit,
}

%w[lane manifesto nav_paradigm layout_skeleton signature_interaction color fonts palette].each do |key|
  entry[key] = manifest[key] if manifest[key]
end

# Idempotent: re-running for the same date replaces the entry.
archive.reject! { |e| e['date'] == date }
archive << entry
archive.sort_by! { |e| e['date'] }

File.write('_data/archive.yml', archive.to_yaml)
puts "==> archive.yml updated with #{entry['theme']} (#{date})"
