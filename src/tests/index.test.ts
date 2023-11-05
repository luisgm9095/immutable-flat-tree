import { expect, test } from 'vitest';
import { addToArray, exampleData } from '..';

test('do something', () => {
  expect(exampleData).toEqual(['123','456','789']);
  addToArray('0ab');
  expect(exampleData).toEqual(['123','456','789','0ab']);
});
