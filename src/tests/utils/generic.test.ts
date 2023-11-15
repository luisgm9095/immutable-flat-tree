import { isEqual } from 'utils/generic'
import { describe, expect, test } from 'vitest'

describe('Generic Utils', () => {
  describe('isEqual()', () => {
    test('should compare undefined or null arguments', () => {
      expect(isEqual(undefined, undefined)).toBe(true)
      expect(isEqual(undefined, null)).toBe(false)
      expect(isEqual(null, undefined)).toBe(false)
      expect(isEqual(null, null)).toBe(true)
      expect(isEqual(null, {})).toBe(false)
      expect(isEqual(undefined, {})).toBe(false)
      expect(isEqual({}, null)).toBe(false)
      expect(isEqual({}, undefined)).toBe(false)
    })

    test('should compare arrays in depth', () => {
      expect(isEqual([], [])).toBe(true)
      expect(isEqual(['a'], ['b'])).toBe(false)
      expect(isEqual(['a', 'b'], ['a', 'b'])).toBe(true)
      expect(isEqual(['a', 'b'], ['b', 'a'])).toBe(false)
      expect(isEqual(['a', 'b'], ['a'])).toBe(false)
      expect(isEqual([{ someProp: 'a' }, 'b'], [{ someProp: 'a'}, 'b'])).toBe(true)
      expect(isEqual([{ someProp: 'a' }, 'b'], [{ someProp: 'c'}, 'b'])).toBe(false)
      expect(isEqual([{ someProp: 'a' }, 'b'], [{ someOtherProp: 'a'}, 'b'])).toBe(false)
    })

    test('should compare objects in depth', () => {
      expect(isEqual({}, {})).toBe(true)
      expect(isEqual({ someProp: 'a'}, { someProp: 'a'})).toBe(true)
      expect(isEqual({ someProp: 'a'}, { someProp: 'a', someOtherProp: 'b'})).toBe(false)
      expect(isEqual({ a: { aa: 'a' }}, { a: { aa: 'a' }})).toBe(true)
    })

    test('should compare primitive values', () => {
      expect(isEqual(1, 1)).toBe(true)
      expect(isEqual(1, 0)).toBe(false)
      expect(isEqual('a', 'a')).toBe(true)
      expect(isEqual('a', 'b')).toBe(false)
    })
  })
})