/**
 * ============================================================
 *  THE TWO FINGERS FOUNDATION — Brand Theme
 * ============================================================
 *
 *  Yahan se poray project ki colours change hoti hain.
 *
 *  HOW TO CHANGE COLOURS:
 *  1. Neeche jo value change karni ho usse update karo.
 *  2. VS Code mein Ctrl+Shift+H (Find & Replace in Files)
 *     kholo aur purana hex → naya hex replace karo.
 *     Example: old "#1B2A4A" → new "#your-color"
 *
 *  NOTE: Ye file reference ke liye hai. Actual colors TSX
 *  files mein Tailwind arbitrary values ke roop mein hain,
 *  e.g. className="text-[#1B2A4A]"
 * ============================================================
 */

export const BRAND_COLORS = {
  // ── Primary Navy (main brand colour — headers, buttons, nav) ──
  primary:      '#1B2A4A',   // Tailwind: [#1B2A4A]  | was green #2C5F2D

  // ── Primary Dark (hover states, footer background) ────────────
  primaryDark:  '#122038',   // Tailwind: [#122038]  | was #234F24

  // ── Primary Light (gradients, avatar, accents) ─────────────────
  primaryLight: '#2D4A8A',   // Tailwind: [#2D4A8A]  | was #4A8B4D

  // ── Gold (secondary accent — badges, highlights, gold text) ───
  gold:         '#C9A961',   // Tailwind: [#C9A961]  | unchanged

  // ── Gold Dark (button hover, gold-on-white) ────────────────────
  goldDark:     '#B89751',   // Tailwind: [#B89751]  | unchanged

  // ── Gold Text (light text on dark backgrounds) ─────────────────
  goldText:     '#E8D9B0',   // Tailwind: [#E8D9B0]  | unchanged

  // ── Background Cream (page background) ────────────────────────
  bg:           '#FAF8F3',   // Tailwind: [#FAF8F3]  | unchanged
} as const;

export type BrandColor = keyof typeof BRAND_COLORS;
