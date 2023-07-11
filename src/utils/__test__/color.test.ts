import { expect, test } from 'vitest';

import { getColorHexFromString, getReadableForeground } from '../color';

test('getColorHexFromString()', async () => {
  expect(getColorHexFromString('a')).toBe('#d2c679');
});

test('getReadableForeground()', async () => {
  expect(getReadableForeground('#ffffff')).toBe('#222222');
  expect(getReadableForeground('#000000')).toBe('#ffffff');
});
