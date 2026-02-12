# Brand Enforcement Guide

## Source Of Truth
- Brand assets and rules are defined in `/brand/*`.
- Always reference `/brand/tokens.json` and `/brand/brand-rules.md` before UI changes.

## Logo Rules (Strict)
- Do not recolor, stretch, distort, rotate, or add any effects to logos.
- Do not add shadow, glow, gradient, or filters to logo assets.
- Use approved provided assets only, with horizontal logo preferred.

## Color Rules
- Colors must come from `/brand/tokens.json` through CSS variables.
- Do not hardcode hex values in components.
- Avoid inline style for colors.

## UI Library Rules
- Use `@ones-design/core` components by default for UI primitives.
- Avoid building custom button/card/form primitives unless strictly necessary.

## Implementation Rules
- Tailwind should map to CSS variables.
- Prefer utility classes for layout and spacing.
- Keep styling consistent and reusable.

## PR Checklist
- Responsive on mobile and desktop.
- Consistent with brand tokens and logo rules.
- Run `npm run lint`, `npm run lint:brand`, and `npm run build` before merge.
