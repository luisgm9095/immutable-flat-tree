import { Id, Node, Tree } from 'types/tree'
import { compose } from 'utils/generic'
import { removeAllChild } from 'utils/node'
import { removeNode, removeParentChild } from 'utils/tree'

/**
 * Deletes a tree node, all its children and descendants,
 * and removes its parent children reference
 * @param nodeId - The tree node id
 * @returns Tree reducer
 */
export const deleteTreeNode = (nodeId: Id) => <T>(tree: Tree<T>): Tree<T> => 
  compose<Tree<T>>(
    // First, delete children
    deleteTreeNodeChildren(nodeId),
    // remove node id from its parent children (if there is a parent)
    removeParentChild(nodeId),
    // Lastly, delete node itself
    removeNode(nodeId)
  )(tree)

/**
 * Deletes all children, and further descendants, of a tree node.
 * @param nodeId - The tree node id to take the action
 * @returns Tree reducer
 */
export const deleteTreeNodeChildren = (nodeId: Id) => <T>(tree: Tree<T>): Tree<T> => {
  let result = tree
  const treeNode = tree.nodeMap[nodeId]

  if (treeNode?.children.length) {
    const deletedNodeIds = [...treeNode.children]
    const updatedNodeMap: { [key: Id]: Node<T> } = { ...tree.nodeMap }
    // Remove children from tree
    for (let i = 0; i < deletedNodeIds.length; i++) {
      const id = deletedNodeIds[i]!
      const node = updatedNodeMap[id]!
      deletedNodeIds.push(...node.children)
    }
    // Clean treenode children property
    updatedNodeMap[nodeId] = removeAllChild(treeNode)
    const deletedNodeKeys = Object.fromEntries(deletedNodeIds.map(id => [id, true]))

    result = {
      rootId: tree.rootId,
      nodeMap: Object.fromEntries(
        Object.entries(updatedNodeMap).filter(([key]) => !deletedNodeKeys[key])
      )
    }
  }

  return result
}