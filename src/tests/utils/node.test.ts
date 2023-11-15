import { addChild, createLeaf, createRoot, hasAncestorId, hasChildId, hasId, hasParentId, isInternal, isLeaf, isRoot, removeAllChild, removeChild, updateParentId, updatePath } from 'utils/node'
import { describe, expect, test } from 'vitest'
import { SomeValueType, _TEST_INTERNAL_NODE_C, _TEST_LEAF_NODE_B, _TEST_ROOT_NODE_A } from '../__data__/test-tree'
import { Node } from 'types/tree'

describe('Node Utils', () => {
  describe('hasId()', () => {
    test('should return true when given node has specific id', () => {
      expect(hasId('a')(_TEST_ROOT_NODE_A)).toBe(true)
    })
    
    test('should return false otherwise', () => {
      expect(hasId('b')(_TEST_ROOT_NODE_A)).toBe(false)
    })
  })

  describe('hasAncestorId()', () => {
    test('should return true when given node contains an id in its path', () => {
      expect(hasAncestorId('a')(_TEST_INTERNAL_NODE_C)).toBe(true)
    })
    
    test('should return false otherwise', () => {
      expect(hasAncestorId('b')(_TEST_INTERNAL_NODE_C)).toBe(false)
    })
  })

  describe('hasChildId()', () => {
    test('should return true when given node contains an id in its children', () => {
      expect(hasChildId('b')(_TEST_ROOT_NODE_A)).toBe(true)
    })

    test('should return false otherwise', () => {
      expect(hasChildId('h')(_TEST_ROOT_NODE_A)).toBe(false)
    })
  })

  describe('hasParentId()', () => {
    test('should return true when given node has an specific parent id', () => {
      expect(hasParentId('a')(_TEST_LEAF_NODE_B)).toBe(true)
    })

    test('should return false otherwise', () => {
      expect(hasParentId('c')(_TEST_LEAF_NODE_B)).toBe(false)
    })
  })

  describe('isLeaf()', () => {
    test('should return true when node has not children', () => {
      expect(isLeaf(_TEST_LEAF_NODE_B)).toBe(true)
    })

    test('should return false otherwise', () => {
      expect(isLeaf(_TEST_INTERNAL_NODE_C)).toBe(false)
    })
  })

  describe('isRoot()', () => {
    test('should return true when given node is root, its parent has a special empty value', () => {
      expect(isRoot(_TEST_ROOT_NODE_A)).toBe(true)
    })

    test('should return false otherwise', () => {
      expect(isRoot(_TEST_LEAF_NODE_B)).toBe(false)
    })
  })

  describe('isInternal()', () => {
    test('should return true when node has parent and children', () => {
      expect(isInternal(_TEST_INTERNAL_NODE_C)).toBe(true)
    })

    test('should return false otherwise', () => {
      expect(isInternal(_TEST_LEAF_NODE_B)).toBe(false)
      expect(isInternal(_TEST_ROOT_NODE_A)).toBe(false)
    })
  })

  describe('createRoot()', () => {
    test('should return a new root node', () => {
      const result = createRoot<SomeValueType>({ someProp: 'value' }, 'a')
      const output: Node<SomeValueType> = {
        children: [],
        id: 'a',
        parentId: '',
        path: [],
        value: { someProp: 'value' }
      }
      expect(result).toEqual(output)
    })
  })

  describe('createLeaf()', () => {
    test('should return a new leaf node', () => {
      const parent: Node<SomeValueType> = {
        children: ['b', 'c'],
        id: 'a',
        parentId: 'x',
        path: ['x'],
        value: { someProp: 'some value' }
      }
      const result = createLeaf<SomeValueType>({ someProp: 'value' }, 'd', parent)
      const output: Node<SomeValueType> = {
        children: [],
        id: 'd',
        parentId: 'a',
        path: ['x', 'a'],
        value: { someProp: 'value' }
      }
      expect(result).toEqual(output)
    })
  })

  describe('addChild()', () => {
    test('should return new node with added child id', () => {
      const result = addChild('x')(_TEST_ROOT_NODE_A)
      const output: Node<SomeValueType> = {
        ..._TEST_ROOT_NODE_A,
        children: [..._TEST_ROOT_NODE_A.children, 'x']
      }
      expect(result).toEqual(output)
    })
    
    test('should return the same node if child id is already present', () => {
      expect(addChild('b')(_TEST_ROOT_NODE_A)).toBe(_TEST_ROOT_NODE_A)
    })
  })

  describe('removeChild()', () => {
    test('should return a new node with removed child id', () => {
      const result = removeChild('b')(_TEST_ROOT_NODE_A)
      const output: Node<SomeValueType> = {
        ..._TEST_ROOT_NODE_A,
        children: ['c', 'd']
      }

      expect(result).toEqual(output)
    })

    test('should returnthe same node if child is not present', () => {
      expect(removeChild('x')(_TEST_ROOT_NODE_A)).toBe(_TEST_ROOT_NODE_A)
    })
  })

  describe('removeAllChild()', () => {
    test('should return a new node without children', () => {
      const result = removeAllChild(_TEST_ROOT_NODE_A)
      const output: Node<SomeValueType> = {
        ..._TEST_ROOT_NODE_A,
        children: []
      }

      expect(result).toEqual(output)
    })

    test('should return the same node if it does not have any children', () => {
      expect(removeAllChild(_TEST_LEAF_NODE_B)).toBe(_TEST_LEAF_NODE_B)
    })
  })

  describe('updatePath()', () => {
    test('should return a new node with updated path', () => {
      const result = updatePath(['x', 'y', 'z'])(_TEST_LEAF_NODE_B)
      const output: Node<SomeValueType> = {
        ..._TEST_LEAF_NODE_B,
        path: ['x', 'y', 'z']
      }

      expect(result).toEqual(output)
    })

    test('should return the same node when new path is equal', () => {
      expect(updatePath(['a'])(_TEST_LEAF_NODE_B)).toBe(_TEST_LEAF_NODE_B)
    })
  })

  describe('updateParentId()', () => {
    test('should return a new node with updated parent id', () => {
      const result = updateParentId('x')(_TEST_LEAF_NODE_B)
      const output: Node<SomeValueType> = {
        ..._TEST_LEAF_NODE_B,
        parentId: 'x'
      }

      expect(result).toEqual(output)
    })

    test('should return the same node when parent is equal', () => {
      expect(updateParentId('a')(_TEST_LEAF_NODE_B)).toBe(_TEST_LEAF_NODE_B)
    })
  })
})
