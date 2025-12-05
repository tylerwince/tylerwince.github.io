# Etch Stacks

This directory contains downloadable .etch flashcard stack files that users can import into the Etch app.

## Adding a new stack

Simply drop your `.etch` file into this directory. That's it!

When you build the site, Jekyll will automatically:
1. Find all `.etch` files in this directory
2. Generate a stack card for each one on the Etch app page
3. JavaScript will load each file and display the stack name and card count

No manual editing required!

## How it works

The Etch app page uses Jekyll templating to scan this directory:
- Finds all files with `.etch` extension
- Generates a beautiful stack card UI for each
- JavaScript fetches the file and extracts:
  - Stack name from `data.stack.name`
  - Card count from `data.stack.flashcards.length`

## Sharing links

Direct download links follow this format:
```
https://tylerwince.com/assets/etch-stacks/your-stack-name.etch
```

Users can tap these links on iOS/iPadOS/macOS to automatically import the stack into Etch.
