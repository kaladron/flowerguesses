# Legacy Static Files

This directory contains the original proof-of-concept code for the flower display.

**Note**: These files are kept for reference but are not used in the current application.

## Files

- `flower.js` - Original flower display class (legacy)
- `main.js` - Original main entry point (legacy)
- `secondflower.svg` - Original SVG flower design (legacy)

## Current Implementation

The current application uses:

- `src/ui/FlowerDisplay.ts` - Modern TypeScript implementation with programmatic SVG generation
- `src/main.ts` - Current entry point

## Security Note

The legacy `flower.js` uses `innerHTML` to insert SVG content, which could be a security risk with untrusted content. The current implementation generates SVG elements programmatically, avoiding this issue.
