export const IMAGES = Array.from({ length: 17 }, (_, i) => `/assets/backImg${i + 1}.webp`).filter(
  (image) => image !== "/assets/backImg9.webp",
);

export const STICKERS = Array.from({ length: 11 }, (_, i) => `/assets/hero_sticker${i + 1}.webp`);

export function shuffle<T>(array: T[]) {
  const copy = [...array];

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}
