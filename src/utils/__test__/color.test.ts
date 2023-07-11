import { expect, test } from 'vitest';

import { getColorHexFromString } from '../color';

test('getColorHexFromString()', async () => {
  expect(getColorHexFromString('a')).toBe('#d2c679');
});
