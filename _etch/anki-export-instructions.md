---
layout: page
title: Anki Export Instructions
---

# Exporting Your Anki Deck for Etch

To import your Anki flashcards into Etch Flashcards, you'll need to export your deck in a specific format. Follow these steps to ensure a smooth transition:

## Export Settings

1. Open Anki and navigate to the deck you want to export.
2. Click on "File" > "Export" in the main menu.
3. In the export dialog, use these settings:

![anki-export-instruction-image](/assets/anki-export-instruction.png)

- Set "Export format" to "Anki Deck Package (.apkg)"
- Check "Include scheduling information"
- Check "Support older Anki versions (slower/larger files)"
- Leave all other options unchecked

4. Click "Export" and choose a location to save the file.

## Supported Card Types

Etch currently supports the following Anki card types:

- Basic cards
- Basic and reversed cards

Please note that Etch does not currently support:

- Cloze deletion cards
- Image occlusion cards
- Audio cards

If your deck contains unsupported card types, they will not be imported into Etch.

## Preserving Your Progress

Good news! Etch Flashcards will automatically parse the scheduling information from your Anki deck and convert it to the Free Spaced Repetition Scheduler (FSRS) parameters used in Etch. This means you won't lose any of your learning progress when transitioning to Etch.

## Additional Information

- Make sure your Anki deck is up-to-date and synced before exporting.
- The exported file may be larger than expected due to the "Support older Anki versions" option. This is normal and ensures compatibility with Etch.
- If you have multiple decks you want to import, repeat this process for each deck separately.
- After importing into Etch, it's recommended to review a few cards to ensure the content and scheduling have been transferred correctly.

If you encounter any issues during the import process or notice any discrepancies in your imported cards, please copy the import log and email to Etch.
