import { Id, Node, Tree } from 'types/tree'
import { compose, isEqual } from 'utils/generic'
import { addChild, hasAncestorId, removeChild, updateParentId, updatePath } from 'utils/node'
import { setNode, updateNodeDescendantPaths } from 'utils/tree'

/**
 * Updates an existing node tree with a new value
 * When node not found, or new value is exact the same existing one,
 * returns the same tree.
 * @param id - The updated node id
 * @param value - The updated node value
 * @returns Tree reducer
 */
export const updateTreeNodeValue = <T>(id: Id, value: T) => (tree: Tree<T>): Tree<T> => {
  const node = tree.nodeMap[id]

  return node && !isEqual(node.value, value) ? {
    rootId: tree.rootId,
    nodeMap: {
      ...tree.nodeMap,
      [id]: {
        ...node,
        value
      }
    }
  } : tree
}

/**
 * Updates a tree node giving it a new parent, if it exists.
 * In the process, it will remove old parent children relationship,
 * and will update all its descendants paths
 * @param id - The node id
 * @param parentId - The new parent id
 * @returns Tree reducer
 */
export const updateTreeNodeParent = (id: Id, parentId: Id) => <T>(tree: Tree<T>): Tree<T> => {
  const node = tree.nodeMap[id]
  const parent = node?.parentId ? tree.nodeMap[node.parentId] : undefined
  const newParent = tree.nodeMap[parentId]

  return node && parent && newParent && id !== parentId && !hasAncestorId(id)(newParent)
    ? compose<Tree<T>>(
      // First, remove parent child connection
      setNode(removeChild(id)(parent)),
      // Then, Update new parent child connection
      setNode(addChild(id)(newParent)),
      // Then, Update node path & parent
      setNode(compose<Node<T>>(
        updatePath([...newParent.path, parentId]),
        updateParentId(parentId)
      )(node)),
      // Lastly, Update all descendant paths
      updateNodeDescendantPaths(id)
    )(tree)
    : tree
}