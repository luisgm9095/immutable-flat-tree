import { createTree, createTreeNode } from 'src'
import { describe, expect, test } from 'vitest'
import { SomeValueType, _TEST_INTERNAL_NODE_D, _TEST_LEAF_NODE_B, _TEST_LEAF_NODE_G, _TEST_MISSING_ID, _TEST_NEW_ID, _TEST_ROOT_NODE, _TEST_TREE, _TEST_VALUE, _TEST_VALUE_A } from '../__data__/test-tree'
import { Tree } from 'types/tree'

describe('Create Tree Reducers', () => {
  describe('createTree()', () => {
    test('should return a tree with a root node', () => {
      const result = createTree(_TEST_VALUE_A, _TEST_ROOT_NODE.id)
      const output: Tree<SomeValueType> = {
        rootId: _TEST_ROOT_NODE.id,
        nodeMap: {
          [_TEST_ROOT_NODE.id]: _TEST_ROOT_NODE
        }
      }

      expect(result).toEqual(output)
    })
  })

  describe('createTreeNode()', () => {
    test('should not create new tree node when parent does not exist', () => {
      const result = createTreeNode<SomeValueType>(_TEST_VALUE, _TEST_NEW_ID, _TEST_MISSING_ID)(_TEST_TREE)
      const output = _TEST_TREE

      expect(result).toBe(output)
    })
    
    test('should not create new tree node when parent does not exist', () => {
      const result = createTreeNode<SomeValueType>(_TEST_VALUE, _TEST_NEW_ID, _TEST_NEW_ID)(_TEST_TREE)
      const output = _TEST_TREE

      expect(result).toBe(output)
    })
    
    test('should create a new tree node and update parent children', () => {
      const result = createTreeNode<SomeValueType>(_TEST_VALUE, _TEST_NEW_ID, 'b')(_TEST_TREE)
      const output: Tree<SomeValueType> = {
        rootId: _TEST_TREE.rootId,
        nodeMap: {
          ..._TEST_TREE.nodeMap,
          ['b']: {
            ..._TEST_LEAF_NODE_B,
            children: [_TEST_NEW_ID]
          },
          [_TEST_NEW_ID]: {
            id: _TEST_NEW_ID,
            children: [],
            parentId: 'b',
            path: [..._TEST_LEAF_NODE_B.path, 'b'],
            value: _TEST_VALUE
          }
        }
      }

      expect(result).toEqual(output)
    })

    test('should create a new tree node overriding existing node (updates oldParent children, removes old children, update new parent children)', () => {
      const result = createTreeNode<SomeValueType>(_TEST_VALUE, 'c', 'd')(_TEST_TREE)
      const output: Tree<SomeValueType> = {
        rootId: 'a',
        nodeMap: {
          ['a']: {
            ..._TEST_ROOT_NODE,
            children: ['b', 'd']
          },
          ['b']: _TEST_LEAF_NODE_B,
          ['d']: {
            ..._TEST_INTERNAL_NODE_D,
            children: ['g', 'c']
          },
          ['g']: _TEST_LEAF_NODE_G,
          ['c']: {
            id: 'c',
            children: [],
            parentId: 'd',
            path: ['a', 'd'],
            value: _TEST_VALUE
          }
        }
      }
      expect(result).toEqual(output)
    })
  })
})
