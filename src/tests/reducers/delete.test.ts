import { deleteTreeNode, deleteTreeNodeChildren } from 'src'
import { describe, expect, test } from 'vitest'
import { SomeValueType, _TEST_INTERNAL_NODE_C, _TEST_INTERNAL_NODE_D, _TEST_LEAF_NODE_B, _TEST_LEAF_NODE_G, _TEST_MISSING_ID, _TEST_ROOT_NODE_A, _TEST_TREE } from '../__data__/test-tree'
import { Tree } from 'types/tree'

describe('Delete Tree Reducers', () => {
  describe('deleteTreeNode()', () => {
    test('should not delete any node when id does not match the tree', () => {
      const result = deleteTreeNode(_TEST_MISSING_ID)(_TEST_TREE)
      const output = _TEST_TREE

      expect(result).toBe(output)
    })

    test('should not delete root node but its children', () => {
      const result = deleteTreeNode('a')(_TEST_TREE)
      const output: Tree<SomeValueType> = {
        rootId: 'a',
        nodeMap: {
          ['a']: {
            ..._TEST_ROOT_NODE_A,
            children: []
          }
        }
      }

      expect(result).toEqual(output)
    })

    test('should delete node, all its descendants, and its reference in parent', () => {
      const result = deleteTreeNode('c')(_TEST_TREE)
      const output: Tree<SomeValueType> = {
        rootId: 'a',
        nodeMap: {
          ['a']: {
            ..._TEST_ROOT_NODE_A,
            children: ['b', 'd']
          },
          ['b']: _TEST_LEAF_NODE_B,
          ['d']: _TEST_INTERNAL_NODE_D,
          ['g']: _TEST_LEAF_NODE_G
        }
      }

      expect(result).toEqual(output)
    })
  })

  describe('deleteTreeNodeChildren()', () => {
    test('should not delete anything if node has not children', () => {
      const result = deleteTreeNodeChildren('b')(_TEST_TREE)
      const output = _TEST_TREE

      expect(result).toBe(output)
    })

    test('should delete all descendants from a node', () => {
      const result = deleteTreeNodeChildren('c')(_TEST_TREE)
      const output: Tree<SomeValueType> = {
        rootId: 'a',
        nodeMap: {
          ['a']: _TEST_ROOT_NODE_A,
          ['b']: _TEST_LEAF_NODE_B,
          ['c']: {
            ..._TEST_INTERNAL_NODE_C,
            children: []
          },
          ['d']: _TEST_INTERNAL_NODE_D,
          ['g']: _TEST_LEAF_NODE_G
        }
      }

      expect(result).toEqual(output)
    })
  })
})