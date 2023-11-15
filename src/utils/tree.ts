import { Id, Node, Tree } from 'types/tree'
import { removeChild } from './node'

export const hasNodeId = (id: Id) => <T>(tree: Tree<T>): boolean =>
  Boolean(tree.nodeMap[id])

export const create = <T>(root: Node<T>): Tree<T> => ({
  rootId: root.id,
  nodeMap: {
    [root.id]: root
  }
})

export const removeNode = (nodeId: Id) => <T>(tree: Tree<T>): Tree<T> => {
  const { [nodeId]: treeNode, ...rest } = tree.nodeMap

  // Never remove root node
  return treeNode?.parentId ? {
    rootId: tree.rootId,
    nodeMap: rest
  } : tree
}

export const removeParentChild = (nodeId: Id) => <T>(tree: Tree<T>): Tree<T> => {
  let result = tree
  const parentId = tree.nodeMap[nodeId]?.parentId

  if (parentId) {
    const parent = tree.nodeMap[parentId]
    
    if (parent) {
      result = {
        ...tree,
        nodeMap: {
          ...tree.nodeMap,
          [parentId]: removeChild(nodeId)(parent)
        }
      }
    }
  }

  return result
}

export const updateNodeDescendantPaths = (nodeId: Id) => <T>(tree: Tree<T>): Tree<T> => {
  let result = tree
  const treeNode = tree.nodeMap[nodeId]
  const descendantNodeIds = treeNode?.children

  if (descendantNodeIds && descendantNodeIds.length) {
    const { path } = treeNode
    const updatedNodeMap = { ...tree.nodeMap }
    // update descendants with new path
    for (let i = 0; i < descendantNodeIds.length; i++) {
      const id = descendantNodeIds[i]!
      const node = updatedNodeMap[id]!
      const pathSliceIndex = node.path.findIndex(el => el === nodeId)
      descendantNodeIds.push(...node.children)
      updatedNodeMap[id] = {
        ...node,
        path: [...path, ...node.path.slice(pathSliceIndex)]
      }
    }

    result = {
      rootId: tree.rootId,
      nodeMap: updatedNodeMap
    }
  }

  return result
}

export const setNode = <T>(node: Node<T>) => (tree: Tree<T>): Tree<T> => 
  tree.nodeMap[node.id] === node 
    ? tree
    : {
      rootId: tree.rootId,
      nodeMap: {
        ...tree.nodeMap,
        [node.id]: node
      }
    }
