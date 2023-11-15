import { Id, Node } from 'types/tree'
import { isEqual } from './generic'

export const hasId = (id: Id) => <T>(node: Node<T>): boolean =>
  node.id === id

export const hasAncestorId = (id: Id) => <T>(node: Node<T>): boolean =>
  node.path.includes(id)

export const hasChildId = (id: Id) => <T>(node: Node<T>): boolean =>
  node.children.includes(id)

export const hasParentId = (id: Id) => <T>(node: Node<T>): boolean =>
  node.parentId === id

export const isLeaf = <T>(node: Node<T>): boolean =>
  node.children.length === 0

export const isRoot = <T>(node: Node<T>): boolean =>
  node.parentId === ''

export const isInternal = <T>(node: Node<T>): boolean =>
  !isRoot(node) && !isLeaf(node)

export const createRoot = <T>(value: T, id: Id): Node<T> => ({
  id,
  children: [],
  parentId: '',
  path: [],
  value,
})

export const createLeaf = <T>(value: T, id: Id, parent: Node<T>): Node<T> => ({
  id,
  children: [],
  parentId: parent.id,
  path: [ ...parent.path, parent.id ],
  value
})

export const addChild = (id: Id) => <T>(node: Node<T>): Node<T> =>
  hasChildId(id)(node)
    ? node 
    : {
      ...node,
      children: [ ...node.children, id]
    }

export const removeChild = (id: Id) => <T>(node: Node<T>): Node<T> =>
  hasChildId(id)(node)
    ? {
      ...node,
      children: node.children.filter(childId => childId !== id)
    }
    : node

export const removeAllChild = <T>(node: Node<T>): Node<T> => 
  node.children.length
    ? {
      ...node,
      children: []
    } : node

export const updatePath = (path: Id[]) => <T>(node: Node<T>): Node<T> =>
  isEqual(node.path, path) 
    ? node
    : {
      ...node,
      path
    }

export const updateParentId = (parentId: Id) => <T>(node: Node<T>): Node<T> =>
  node.parentId === parentId
    ? node
    : ({
      ...node,
      parentId
    })
