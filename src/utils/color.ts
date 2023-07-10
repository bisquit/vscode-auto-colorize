import ColorHash from 'color-hash';
import tinycolor from 'tinycolor2';

export function getColorHexFromString(str: string): string {
  const colorHash = new ColorHash();

  return colorHash.hex(str);
}

export function getReadableForeground(bgHex: string): string {
  const bgColor = tinycolor(bgHex);

  let fgHex: string;
  const fgDark = '#222222';
  const fgLight = '#ffffff';

  if (bgColor.isLight()) {
    fgHex = fgDark;
  } else {
    fgHex = fgLight;
  }

  return fgHex;
}
