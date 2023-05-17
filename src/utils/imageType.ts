export const PNG_REGX = /\.png$/;
export const JPG_REGX = /\.jp[e|eg]$/;

export function isPNG(filepath: string) {
  return PNG_REGX.test(filepath);
}

export function isJPG(filepath: string) {
  return JPG_REGX.test(filepath);
}

export function isWebp(filepath: string) {
  return /\.webp$/.test(filepath);
}
