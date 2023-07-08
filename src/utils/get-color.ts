import ColorHash from 'color-hash';

export function getColorHexFromString(str: string): string {
  const colorHash = new ColorHash();

  return colorHash.hex(str);
}
