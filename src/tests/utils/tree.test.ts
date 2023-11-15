import { create, hasNodeId, removeNode, removeParentChild, setNode, updateNodeDescendantPaths } from 'utils/tree'
import { describe, expect, test } from 'vitest'
import { SomeValueType, _TEST_INTERNAL_NODE_C, _TEST_INTERNAL_NODE_D, _TEST_INTERNAL_NODE_F, _TEST_LEAF_NODE_B, _TEST_LEAF_NODE_E, _TEST_LEAF_NODE_G, _TEST_LEAF_NODE_H, _TEST_MISSING_ID, _TEST_ROOT_NODE_A, _TEST_TREE } from '../__data__/test-tree'
import { Node, Tree } from 'types/tree'

describe('Tree Utils', () => {
  describe('hasNodeId()', () => {
    test('should return true when a tree contains a node with an specific id', () => {
      expect(hasNodeId('a')(_TEST_TREE)).toBe(true)
    })

    test('should return false otherwise', () => {
      expect(hasNodeId(_TEST_MISSING_ID)(_TEST_TREE)).toBe(false)
    })
  })

  describe('create()', () => {
    test('should return a new tree given a root value', () => {
      const result = create<SomeValueType>(_TEST_ROOT_NODE_A)
      const output: Tree<SomeValueType> = {
        rootId: 'a',
        nodeMap: {
          ['a']: _TEST_ROOT_NODE_A
        }
      }

      expect(result).toEqual(output)
    })
  })

  describe('removeNode()', () => {
    test('should return new tree with removed node', () => {
      const result = removeNode('b')(_TEST_TREE)
      const output: Tree<SomeValueType> = {
        rootId: 'a',
        nodeMap: {
          ['a']: _TEST_ROOT_NODE_A,
          ['c']: _TEST_INTERNAL_NODE_C,
          ['d']: _TEST_INTERNAL_NODE_D,
          ['e']: _TEST_LEAF_NODE_E,
          ['f']: _TEST_INTERNAL_NODE_F,
          ['g']: _TEST_LEAF_NODE_G,
          ['h']: _TEST_LEAF_NODE_H,
        }
      }

      expect(result).toEqual(output)
    })

    test('should not remove unexisting node from tree and return same tree instead', () => {
      expect(removeNode(_TEST_MISSING_ID)(_TEST_TREE)).toBe(_TEST_TREE)
    })

    test('should not remove parent node from tree and return same tree instead', () => {
      expect(removeNode('a')(_TEST_TREE)).toBe(_TEST_TREE)
    })
  })

  describe('removeParentChild()', () => {
    test('should return a new tree with given node id removed from its parent children', () => {
      const result = removeParentChild('b')(_TEST_TREE)
      const output: Tree<SomeValueType> = {
        rootId: 'a',
        nodeMap:  {
          ['a']: {
            ..._TEST_ROOT_NODE_A,
            children: ['c', 'd']
          },
          ['b']: _TEST_LEAF_NODE_B,
          ['c']: _TEST_INTERNAL_NODE_C,
          ['d']: _TEST_INTERNAL_NODE_D,
          ['e']: _TEST_LEAF_NODE_E,
          ['f']: _TEST_INTERNAL_NODE_F,
          ['g']: _TEST_LEAF_NODE_G,
          ['h']: _TEST_LEAF_NODE_H,
        }
      }

      expect(result).toEqual(output)
    })

    test('should return same tree when given node id is from root node', () => {
      expect(removeParentChild('a')(_TEST_TREE)).toBe(_TEST_TREE)
    })

    test('should return same tree when given node id parent is not found', () => {
      const tree: Tree<SomeValueType> = {
        rootId: 'a',
        nodeMap: {
          ['a']: _TEST_ROOT_NODE_A,
          ['b']: _TEST_LEAF_NODE_B,
          ['e']: _TEST_LEAF_NODE_E
        }
      }
      expect(removeParentChild('e')(tree)).toBe(tree)
    })
  })

  describe('updateNodeDescendantPaths', () => {
    test('should return a new tree with updated node paths from ancestors of node with given id', () => {
      const tree: Tree<SomeValueType> = {
        rootId: 'a',
        nodeMap:  {
          ['a']: _TEST_ROOT_NODE_A,
          ['b']: _TEST_LEAF_NODE_B,
          ['c']: _TEST_INTERNAL_NODE_C,
          ['d']: _TEST_INTERNAL_NODE_D,
          ['e']: {
            ..._TEST_LEAF_NODE_E,
            path: ['a', 'd', 'c']
          },
          ['f']: {
            ..._TEST_INTERNAL_NODE_F,
            path: ['a', 'd', 'c']
          },
          ['g']: _TEST_LEAF_NODE_G,
          ['h']: {
            ..._TEST_LEAF_NODE_H,
            path: ['a', 'd', 'c', 'f']
          },
        }
      }
      expect(updateNodeDescendantPaths('c')(tree)).toEqual(_TEST_TREE)
    })

    test('should return same tree when given node id has not descendants', () => {
      expect(updateNodeDescendantPaths('h')(_TEST_TREE)).toBe(_TEST_TREE)
    })
  })

  describe('setNode()', () => {
    test('should return a new tree with a node insterted', () => {
      const newNode: Node<SomeValueType> = {
        children: [],
        id: 'someId',
        parentId: 'b',
        path: ['a', 'b'],
        value: {
          someProp: 'someValue'
        }
      }
      const result = setNode(newNode)(_TEST_TREE)
      const output: Tree<SomeValueType> = {
        rootId: 'a',
        nodeMap:  {
          ['a']: _TEST_ROOT_NODE_A,
          ['b']: _TEST_LEAF_NODE_B,
          ['c']: _TEST_INTERNAL_NODE_C,
          ['d']: _TEST_INTERNAL_NODE_D,
          ['e']: _TEST_LEAF_NODE_E,
          ['f']: _TEST_INTERNAL_NODE_F,
          ['g']: _TEST_LEAF_NODE_G,
          ['h']: _TEST_LEAF_NODE_H,
          ['someId']: newNode
        }
      }

      expect(result).toEqual(output)
    })

    test('should return the same tree when inserted node already exists with exact properties', () => {
      expect(setNode(_TEST_LEAF_NODE_B)(_TEST_TREE)).toBe(_TEST_TREE)
    })
  })
})
