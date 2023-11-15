import { updateTreeNodeParent, updateTreeNodeValue } from 'src'
import { describe, expect, test } from 'vitest'
import { SomeValueType, _TEST_INTERNAL_NODE_C, _TEST_INTERNAL_NODE_D, _TEST_INTERNAL_NODE_F, _TEST_LEAF_NODE_B, _TEST_LEAF_NODE_E, _TEST_LEAF_NODE_G, _TEST_LEAF_NODE_H, _TEST_MISSING_ID, _TEST_ROOT_NODE_A, _TEST_TREE, _TEST_VALUE_C } from '../__data__/test-tree'
import { Tree } from 'types/tree'

describe('Update Tree Reducers', () => {
  describe('updateTreeNodeValue()', () => {
    test('should not update node value when new one is equal', () => {
      const newValue: SomeValueType = { ..._TEST_VALUE_C }
      const result = updateTreeNodeValue('c', newValue)(_TEST_TREE)
      const output = _TEST_TREE

      expect(result).toBe(output)
    })

    test('should not update node when it does not exist', () => {
      const newValue: SomeValueType = { ..._TEST_VALUE_C }
      const result = updateTreeNodeValue(_TEST_MISSING_ID, newValue)(_TEST_TREE)
      const output = _TEST_TREE

      expect(result).toBe(output)
    })

    test('should update node value when new one has any difference', () => {
      const newValue: SomeValueType = { someProp: 'someNewValue' }
      const result = updateTreeNodeValue('c', newValue)(_TEST_TREE)
      const output: Tree<SomeValueType> = {
        ..._TEST_TREE,
        nodeMap: {
          ..._TEST_TREE.nodeMap,
          ['c']: {
            ..._TEST_INTERNAL_NODE_C,
            value: newValue
          }
        }
      }

      expect(result).toEqual(output)
    })
  })

  describe('updateTreeNodeParent()', () => {
    test('should not update node parent when node does not exist', () => {
      const result = updateTreeNodeParent(_TEST_MISSING_ID, 'c')(_TEST_TREE)
      const output = _TEST_TREE

      expect(result).toBe(output)
    })

    test('should not update node parent when new parent does not exist', () => {
      const result = updateTreeNodeParent('c', _TEST_MISSING_ID)(_TEST_TREE)
      const output = _TEST_TREE
      
      expect(result).toBe(output)
    })

    test('should not update node parent when node is already an ancestor of parent', () => {
      const result = updateTreeNodeParent('c', 'h')(_TEST_TREE)
      const output = _TEST_TREE
      
      expect(result).toBe(output)
    })

    test('should not update node parent when node is root', () => {
      const result = updateTreeNodeParent('a', 'h')(_TEST_TREE)
      const output = _TEST_TREE
      
      expect(result).toBe(output)
    })

    test('should update node parent, removing from the old one, and updating descendants', () => {
      const result = updateTreeNodeParent('f', 'a')(_TEST_TREE)
      const output: Tree<SomeValueType> = {
        ..._TEST_TREE,
        nodeMap: {
          ['a']: {
            ..._TEST_ROOT_NODE_A,
            children: ['b', 'c', 'd', 'f']
          },
          ['b']: _TEST_LEAF_NODE_B,
          ['c']: {
            ..._TEST_INTERNAL_NODE_C,
            children: ['e']
          },
          ['d']: _TEST_INTERNAL_NODE_D,
          ['e']: _TEST_LEAF_NODE_E,
          ['f']: {
            ..._TEST_INTERNAL_NODE_F,
            parentId: 'a',
            path: ['a']
          },
          ['g']: _TEST_LEAF_NODE_G,
          ['h']: {
            ..._TEST_LEAF_NODE_H,
            path: ['a', 'f']
          }
        }
      }

      expect(result).toEqual(output)
    })
  })
})