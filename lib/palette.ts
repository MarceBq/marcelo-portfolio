/**
 * The whole site draws from these colours and nothing else: night tones for
 * the sky and UI, cream for light, warm accents for life, plus the eight
 * tones of Marcelo's own skin, hair and eyes.
 * Tailwind and the sprite renderer both read from here.
 */
export const palette = {
  // night
  ink: "#0d0b1e",
  night900: "#14122b",
  night800: "#1c1a40",
  night700: "#272559",
  night600: "#353374",
  dusk500: "#4d3f8a",
  dusk400: "#6e5aa8",
  haze: "#9a86c9",
  // light and neutrals
  cream: "#f4ead2",
  sand: "#d9c9a5",
  mist: "#a8a3c0",
  ash: "#5b5a7d",
  // warm accents
  amber: "#f2b84b",
  peach: "#f6a57a",
  coral: "#e8735f",
  rust: "#b4503f",
  // cool accents
  teal: "#5fc9b8",
  sky: "#6fa8e8",
  blue: "#3b6fc4",
  moss: "#4f8a63",
  pine: "#234a47",
  // character: skin, curly black hair, eyes
  skinLight: "#e8b48a",
  skin: "#c98a62",
  skinShade: "#9a5e48",
  skinDeep: "#6b3b36",
  hairLight: "#4a3a4e",
  hair: "#2a2030",
  hairShade: "#15101a",
  eye: "#3b2418",
} as const;

export type PaletteColor = keyof typeof palette;
