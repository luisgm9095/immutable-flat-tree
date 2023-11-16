import { getOrderedTreeNodes } from 'src'
import { describe, expect, test } from 'vitest'
import { _TEST_INTERNAL_NODE_C, _TEST_INTERNAL_NODE_D, _TEST_INTERNAL_NODE_F, _TEST_LEAF_NODE_B, _TEST_LEAF_NODE_E, _TEST_LEAF_NODE_G, _TEST_LEAF_NODE_H, _TEST_ROOT_NODE_A, _TEST_TREE } from '../__data__/test-tree'

describe('Order Utils', () => {
  describe('getOrderedTreeNodes()', () => {
    test('should return an ordered array', () => {
      const result = getOrderedTreeNodes(_TEST_TREE)
      const output = [
        _TEST_ROOT_NODE_A,      // a            // Root
        _TEST_LEAF_NODE_B,      // ├─ b         // Leaf
        _TEST_INTERNAL_NODE_C,  // ├─ c         // Internal
        _TEST_LEAF_NODE_E,      // │  ├─ e      // Leaf
        _TEST_INTERNAL_NODE_F,  // │  └─ f      // Internal
        _TEST_LEAF_NODE_H,      // │     └─ h   // Leaf
        _TEST_INTERNAL_NODE_D,  // └─ d         // Internal
        _TEST_LEAF_NODE_G,      //    └─ g      // Leaf
      ]

      expect(result).toEqual(output)
    })
  })
})