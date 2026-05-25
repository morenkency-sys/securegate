# Component Builder Skill

## Purpose

Generates reusable UI components following the design system.

---

# Token Source of Truth

Before building any component, inspect these files:
- tokens/variables.css — contains all available CSS custom properties (colors, typography)
- tokens/color-tokens.json — raw color palette data for reference

All style values must use CSS variables from tokens/variables.css.
Never hardcode colors, font sizes, spacing, or font families.

---

# Rules

Components must:
- Use CSS variables from tokens/variables.css
- Be responsive (mobile-first)
- Be accessible (ARIA labels, keyboard navigation, focus states)
- Be reusable with typed props
- Be typed properly (TypeScript interfaces)

---

# Steps

1. Inspect tokens/variables.css for available CSS variables
2. Identify color, typography, and spacing tokens needed
3. Build CSS Module (.module.css) using CSS variables
4. Add responsiveness with media queries
5. Add accessibility attributes
6. Export typed component with props interface

---

# Avoid

- Hardcoded styles
- Massive components
- Business logic in UI
- Inline style props (except for truly dynamic values)
