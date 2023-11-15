export type Id = string

export type Node<T> = {
  id: Id
  parentId: Id
  path: Id[]
  children: Id[]
  value: T
}

export type NodeMap<T> = { [key: Id]: Node<T> }

export type Tree<T> = {
  rootId: Id
  nodeMap: NodeMap<T> 
}
