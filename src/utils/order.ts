import { Node, Tree } from 'types/tree'

/**
 * Transform tree into node array, where every node will be followed
 * immediatly by its children
 * @param tree - Tree to order
 * @param comparator - Comparator function. If not defined, items will be arranged in the same order as they are in their parent children
 * @returns ordered node array
 * @example
 * // Tree:
 * // a            // Root
 * // ├─ b         // Leaf
 * // ├─ c         // Internal
 * // │  ├─ e      // Leaf
 * // │  └─ f      // Internal
 * // │     └─ h   // Leaf
 * // └─ d         // Internal
 * //    └─ g      // Leaf
 * 
 * // Array:
 * // [a, b, c, e, f, h, d, g]
 */
export const getOrderedTreeNodes = <T>(tree: Tree<T>, comparator: (a: Node<T>, b: Node<T>) => number = () => 1): Node<T>[] => {
  const { rootId, nodeMap } = tree
  const root = nodeMap[rootId]!
  const result: Node<T>[] = []
  const stack: Node<T>[] = [root]  

  while (stack.length) {
    const node = stack.pop()!
    const children = node.children.map<Node<T>>(id => nodeMap[id]!).sort((a, b) => -comparator(a, b))
    result.push(node)
    stack.push(...children)
  }

  return result
}