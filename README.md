# Immutable Flat Tree

## Long Story Short

```js
Tree<T> {
  rootId: Id
  nodemap: { [Id]: Node<T> }
}

Node<T> {
  id: Id
  ...
  value: T
}
```

## Description

There are many powerful libraries that deal with trees in a super efficient way, as they store tree data in [**Map**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) structures.

But, some potential consumers, like React, don't get this effiency benefit, as they need data structures that *react* to changes in nodes.

This library comes to the rescue. It offers a simple way to structure trees. Objectively, it won't be as efficient as others, but it's oriented to serve these potential consumers in the way they need.

## Install

Using npm:

```bash
$ npm install immutable-flat-tree
```

Using yarn:

```bash
$ yarn add immutable-flat-tree
```

## Usage

### Create a tree

```js
import { createTree } from 'immutable-flat-tree';

const tree = createTree('some value', 'a');

// Tree:
// a -> 'some value'
//
```

### Create a tree node

```js
import { ... , createTreeNode } from 'immutable-flat-tree';

...

const updatedTree1 = createTreeNode('some other value b', 'b', 'a')(tree);
const updatedTree2 = createTreeNode('some other value c', 'c', 'a')(updatedTree1);
const updatedTree3 = createTreeNode('some other value d', 'd', 'a')(updatedTree2);
const updatedTree4 = createTreeNode('some other value e', 'e', 'b')(updatedTree3);
const updatedTree5 = createTreeNode('some other value f', 'f', 'd')(updatedTree4);

// Updated Tree 5:
// a -> 'some value'
// ├─ b -> 'some other value b'
// │  └─ e -> 'some other value e'
// ├─ c -> 'some other value c'
// └─ d -> 'some other value d'
//    └─ f -> 'some other value f'
```


### Delete a tree node

```js
import { ... , deleteTreeNode } from 'immutable-flat-tree';

...

const updatedTree6 = deleteTreeNode('c')(updatedTree5);

// Updated Tree 6:
// a -> 'some value'
// ├─ b -> 'some other value b'
// │  └─ e -> 'some other value e'
// └─ d -> 'some other value d'
//    └─ f -> 'some other value f'
```


### Delete children from a tree node

```js
import { ... , deleteTreeNodeChildren } from 'immutable-flat-tree';

...

const updatedTree7 = deleteTreeNodeChildren('d')(updatedTree6);

// Updated Tree 7:
// a -> 'some value'
// ├─ b -> 'some other value b'
// │  └─ e -> 'some other value e'
// └─ d -> 'some other value d'
```


### Update parentship of a tree node

```js
import { ... , updateTreeNodeParent } from 'immutable-flat-tree';

...

const updatedTree8 = updateTreeNodeParent('e', 'd')(updatedTree7);

// Updated Tree 8:
// a -> 'some value'
// ├─ b -> 'some other value b'
// └─ d -> 'some other value d'
//    └─ e -> 'some other value e'
```


### Update a tree node value
```js
import { ... , updateTreeNodeValue } from 'immutable-flat-tree';

...

const updatedTree9 = updateTreeNodeValue('b', 'foo')(updatedTree8);

// Updated Tree 9:
// a -> 'some value'
// ├─ b -> 'foo'
// └─ d -> 'some other value d'
//    └─ e -> 'some other value e'
```


### Convert tree to ordered array

```js
import { ... , getOrderedTreeNodes } from 'immutable-flat-tree';

...

const defaultOrderedNodes = getOrderedTreeNodes(updatedTree9);

// Ordered Nodes:
// [a, b, d, e]

const inverseAlphabeticallyOrderedNodes = getOrderedTreeNodes(updatedTree9, (a, b) => b.value - a.value);

// Inverse Alphabetically Ordered Nodes
// [a, d, e, b]
```

## Types

In the usage examples above, a primitive **string** has been used. But you can use any other type with more complexity like:
```js
import { createTree } from 'immutable-flat-tree';

const tree = createTree({
  name: 'some name value',
  description: 'some description value',
}, 'a')

const orderedByName = getOrderedTreeNodes(tree, (a, b) => a.value.name - b.value.name);
```
