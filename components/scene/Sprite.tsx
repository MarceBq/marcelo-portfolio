import type { SpritePath } from "@/lib/sprites";

/** Renders sprite paths inside an existing <svg>. */
export default function Sprite({ paths }: { paths: SpritePath[] }) {
  return (
    <>
      {paths.map((path) => (
        <path key={path.fill} fill={path.fill} d={path.d} />
      ))}
    </>
  );
}
