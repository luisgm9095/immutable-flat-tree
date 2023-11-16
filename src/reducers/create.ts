import { compose } from 'utils/generic'
import { addChild, createLeaf, createRoot, removeChild } from 'utils/node'
import { create, setNode } from 'utils/tree'
import { deleteTreeNodeChildren } from './delete'
import { Id, Tree } from 'types/tree'

/**
 * Creates a new tree given a root value and id.
 * Tree nodes are stored in a flat object structure,
 * where every node holds infomation about a value,
 * @param rootValue - The value contained by the root node
 * @param rootId - The root node id
 * @returns A new tree with a predefined root value
 * @example 
 * const newStringTree = createTree<string>('root node value', 'myRootId');
 */
export const createTree = <T>(rootValue: T, rootId: Id): Tree<T> =>
  create(createRoot(rootValue, rootId))

/**
 * Creates a new node and inserts it in a given tree.
 * It requires a node value, an id, and a parent id
 * It will replace any node in the tree, and remove its existing descendants,
 * that also have the passed id
 * @param value - The value contained by the new node
 * @param id - The node id
 * @param parentId - The parent node id
 * @returns Tree reducer
 * @example
 * const tree = createTree<string>('rootValue','a')
 * const updatedTreeWithB = createTreeNode('value B', 'b', 'a', tree)
 * const updatedTreeWithC = createTreeNode('value C', 'c', 'a', updatedTreeWithB)
 * // a    - rootValue
 * // ├─ b - value B
 * // └─ c - value C
 * //
 */
export const createTreeNode = <T>(value: T, id: Id, parentId: Id) => (tree: Tree<T>): Tree<T> => {
  const parent = tree.nodeMap[parentId]
  const overridedNode = tree.nodeMap[id]
  const oldParent = overridedNode?.parentId ? tree.nodeMap[overridedNode.parentId] : undefined
  //Ensure parent exists and is does not have the same id
  return parent && parentId !== id
    ? compose<Tree<T>>(
      // First, delete children (if it's an override)
      deleteTreeNodeChildren(id),
      // Update old parent child (if there is an override)
      oldParent ? setNode(removeChild(id)(oldParent)) : ((tree) => tree),
      // Update direct parent (add id to children)
      setNode(addChild(id)(parent)),         
      // Lastly, create it (overrides any existing one)
      setNode(createLeaf(value, id, parent)) 
    )(tree) : tree
}