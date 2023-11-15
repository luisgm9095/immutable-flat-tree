import { Id, Node, Tree } from 'types/tree'

export type SomeValueType = {
  someProp: string
}

// Test Node structure example

// a            // Root
// ├─ b         // Leaf
// ├─ c         // Internal
// │  ├─ e      // Leaf
// │  └─ f      // Internal
// │     └─ h   // Leaf
// └─ d         // Internal
//    └─ g      // Leaf

export const _TEST_VALUE_A: SomeValueType = { someProp: 'testValueA' }
export const _TEST_VALUE_B: SomeValueType = { someProp: 'testValueB' }
export const _TEST_VALUE_C: SomeValueType = { someProp: 'testValueC' }
export const _TEST_VALUE_D: SomeValueType = { someProp: 'testValueD' }
export const _TEST_VALUE_E: SomeValueType = { someProp: 'testValueE' }
export const _TEST_VALUE_F: SomeValueType = { someProp: 'testValueF' }
export const _TEST_VALUE_G: SomeValueType = { someProp: 'testValueG' }
export const _TEST_VALUE_H: SomeValueType = { someProp: 'testValueH' }

export const _TEST_ROOT_NODE: Node<SomeValueType> = {
  id: 'a',
  children: [],
  parentId: '',
  path: [],
  value: _TEST_VALUE_A
}

export const _TEST_ROOT_NODE_A: Node<SomeValueType> = {
  id: 'a',
  children: ['b', 'c', 'd'],
  parentId: '',
  path: [],
  value: _TEST_VALUE_A
}

export const _TEST_LEAF_NODE_B: Node<SomeValueType> = {
  id: 'b',
  children: [],
  parentId: 'a',
  path: ['a'],
  value: _TEST_VALUE_B
}

export const _TEST_INTERNAL_NODE_C: Node<SomeValueType> = {
  id: 'c',
  children: ['e', 'f'],
  parentId: 'a',
  path: ['a'],
  value: _TEST_VALUE_C
}

export const _TEST_INTERNAL_NODE_D: Node<SomeValueType> = {
  id: 'd',
  children: ['g'],
  parentId: 'a',
  path: ['a'],
  value: _TEST_VALUE_D
}

export const _TEST_LEAF_NODE_E: Node<SomeValueType> = {
  id: 'e',
  children: [],
  parentId: 'c',
  path: ['a', 'c'],
  value: _TEST_VALUE_E
}

export const _TEST_INTERNAL_NODE_F: Node<SomeValueType> = {
  id: 'f',
  children: ['h'],
  parentId: 'c',
  path: ['a', 'c'],
  value: _TEST_VALUE_F
}

export const _TEST_LEAF_NODE_G: Node<SomeValueType> = {
  id: 'g',
  children: [],
  parentId: 'd',
  path: ['a', 'd'],
  value: _TEST_VALUE_G
}

export const _TEST_LEAF_NODE_H: Node<SomeValueType> = {
  id: 'h',
  children: [],
  parentId: 'f',
  path: ['a', 'c', 'f'],
  value: _TEST_VALUE_H
}

export const _TEST_TREE: Tree<SomeValueType> = {
  rootId: _TEST_ROOT_NODE_A.id,
  nodeMap: {
    [_TEST_ROOT_NODE_A.id]: _TEST_ROOT_NODE_A,
    [_TEST_LEAF_NODE_B.id]: _TEST_LEAF_NODE_B,
    [_TEST_INTERNAL_NODE_C.id]: _TEST_INTERNAL_NODE_C,
    [_TEST_INTERNAL_NODE_D.id]: _TEST_INTERNAL_NODE_D,
    [_TEST_LEAF_NODE_E.id]: _TEST_LEAF_NODE_E,
    [_TEST_INTERNAL_NODE_F.id]: _TEST_INTERNAL_NODE_F,
    [_TEST_LEAF_NODE_G.id]: _TEST_LEAF_NODE_G,
    [_TEST_LEAF_NODE_H.id]: _TEST_LEAF_NODE_H,
  }
}

export const _TEST_VALUE: SomeValueType = { someProp: 'whatever'}
export const _TEST_NEW_ID: Id = 'newId'
export const _TEST_MISSING_ID: Id = 'missingId'