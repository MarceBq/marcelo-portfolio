import { palette } from "@/lib/palette";
import { spritePaths, type Legend } from "@/lib/sprites";
import Sprite from "./Sprite";

/*
 * Marcelo, in profile, looking right toward the moon: black curly hair,
 * glasses, headphones, blue polo, backpack, black trousers, white sneakers.
 * An original sprite, 20 x 32 pixels, drawn in three parts so the upper body
 * can breathe over the legs.
 */
const legend: Legend = {
  H: "ink", // hair
  h: "ash", // hair, moonlit curls
  A: "amber", // headphones
  a: "rust", // headphone cup
  S: "skin",
  s: "skinShade",
  G: "ink", // glasses frame
  W: "cream", // eye
  E: "ink", // pupil
  B: "blue", // polo
  b: "night600", // polo shade
  l: "sky", // polo highlight
  M: "moss", // backpack
  m: "pine", // backpack shade and strap
  N: "ink", // trousers
  r: "ash", // trousers, moonlit edge
  Z: "cream", // sneakers
  z: "sand", // soles
};

const hairTop = [
  ".......HHH.HH.......",
  ".....HHhHHHHhHH.....",
];

const head = [
  "....HHhHHAHHHhHHH...",
  "...HHHHHHAHHHHHhHH..",
  "...HhHHHHAHHhHHHHH..",
  "...HHHHhHAHSSSSSSh..",
  "...HhHHHAAAGGGGGG...",
  "....HHHHAaASGWWEG...",
  "....HhHHAaASGGGGGS..",
  ".....HHHAAASSSSSS...",
  "......HHsSSSSSSsS...",
  ".......HsSSSSSSS....",
  "..........sSS.......",
];

const torso = [
  "........BBllBBB.....",
  "....MMMMmBBBBBl.....",
  "...MMMMMmBbBBBl.....",
  "...MmMMMmBbllBl.....",
  "...MMMMMmBsSSBl.....",
  "...MMmMMBBsSSBl.....",
  "...MMMMMBBsSSBl.....",
  "....MMMMBBsSSBB.....",
  "....mmmmBBsSSBB.....",
];

const legs = [
  "........NNNSSNN.....",
  "........NNNNNNr.....",
  "........NNNNNNr.....",
  "........NNNNNNr.....",
  "........NNN.NNr.....",
  "........NNN.NNr.....",
  "........NNN.NNr.....",
  "........NNN.NNN.....",
  "........ZZZzZZZZ....",
  "........zzzzzzzzz...",
];

const WIDTH = 20;
const HEIGHT = hairTop.length + head.length + torso.length + legs.length;

const hairTopPaths = spritePaths(hairTop, legend);
const headPaths = spritePaths(head, legend, hairTop.length);
const torsoPaths = spritePaths(torso, legend, hairTop.length + head.length);
const legsPaths = spritePaths(legs, legend, HEIGHT - legs.length);

/** The idle loop is three CSS animations: breathing, a blink and a stir of hair. */
export default function Character() {
  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      role="img"
      aria-label="Marcelo standing on a hill with headphones and a backpack, looking up at the moon"
      className="sprite"
      style={{ "--w": WIDTH, "--h": HEIGHT } as React.CSSProperties}
    >
      <Sprite paths={legsPaths} />
      <g className="char-breathe">
        <Sprite paths={torsoPaths} />
        <Sprite paths={headPaths} />
        <g className="char-hair">
          <Sprite paths={hairTopPaths} />
        </g>
        {/* Eyelid: covers the eye for a frame or two. */}
        <rect className="char-lid" x="13" y="7" width="3" height="1" fill={palette.skin} />
      </g>
    </svg>
  );
}
