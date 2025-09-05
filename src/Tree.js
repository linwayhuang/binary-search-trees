import { Node } from "./Node";

export class Tree {
    constructor(array) {
        this.root = this.buildTree(array);
    }

    buildTree(array) {

        // Remove duplicates (by using Set) and sort
        // Make sure you always use spread to see the contents of a Set
        // Otherwise, it will log as [object Set] when you try to print it.
        const uniqueSortedArray = [...new Set(array)].sort((a, b) => a - b);

        // Helper recursive function
        const buildRecursive = (arr) => {
            if (arr.length === 0) return null;

            const mid = Math.floor(arr.length / 2);
            const node = new Node(arr[mid]);

            node.left = buildRecursive(arr.slice(0, mid));
            node.right = buildRecursive(arr.slice(mid + 1));

            return node;
        };

        return buildRecursive(uniqueSortedArray);
    }

    prettyPrint(node = this.root, prefix = "", isLeft = true) {
        if (node === null) return;
        if (node.right !== null) {
            this.prettyPrint(node.right, prefix + (isLeft ? "│   " : "    "), false);
        }
        console.log(prefix + (isLeft ? "└── " : "┌── ") + node.data);
        if (node.left !== null) {
            this.prettyPrint(node.left, prefix + (isLeft ? "    " : "│   "), true);
        }
    }

    // Insert a value into the BST
    insert(value, node = this.root) {
        if (node === null) return new Node(value);

        if (value < node.data) {
            node.left = this.insert(value, node.left);
        } else if (value > node.data) {
            node.right = this.insert(value, node.right);
        }

        // ignore duplicates
        return node;
    }

    // Delete a value from the BST
    deleteItem(value, node = this.root) {
        if (node === null) return null;

        if (value < node.data) {
            node.left = this.deleteItem(value, node.left);
        } else if (value > node.data) {
            node.right = this.deleteItem(value, node.right);
        } else {
            // No children
            if (node.left === null && node.right === null) {
                return null
            }
            // One child
            if (node.left === null) return node.right;
            if (node.right === null) return node.left;
            // Two children, replace with inorder successor
            let successor = node.right;
            while (successor.left !== null) {
                successor = successor.left;
            }
            node.data = successor.data;
            node.right = this.deleteItem(successor.data, node.right);
        }
        return node;
    }

    // Find a node
    find(value, node = this.root) {
        if (node === null) return null;
        if (node.data === value) return node;
        if (value < node.data) return this.find(value, node.left);
        return this.find(value, node.right);
    }

    // Level Order Traversal - Iterative (queue)
    levelOrderForEach(callback) {
        if (typeof callback !== "function") {
            throw new Error("A callback function is required");
        }
        const queue = [];
        if (this.root) queue.push(this.root);

        while (queue.length > 0) {
            const current = queue.shift();
            callback(current);
            if (current.left) queue.push(current.left);
            if (current.right) queue.push(current.right);
        }
    }

    // Level Order Traversal - Recursive
    levelOrderForEachRecursive(callback) {
        if (typeof callback !== "function") {
            throw new Error("A callback function is required");
        }
        const queue = [];
        if (this.root) queue.push(this.root);

        const traverse = () => {
            if (queue.length === 0) return;
            const current = queue.shift();
            callback(current);
            if (current.left) queue.push(current.left);
            if (current.right) queue.push(current.right);
            traverse();
        };

        traverse();
    }

    // Inorder Traversal (Left, Root, Right)
    inOrderForEach(callback, node = this.root) {
        if (typeof callback !== "function") {
            throw new Error("A callback function is required");
        }
        if (node === null) return;
        this.inOrderForEach(callback, node.left);
        callback(node);
        this.inOrderForEach(callback, node.right);
    }

    // Preorder Traversal (Root, Left, Right)
    preOrderForEach(callback, node = this.root) {
        if (typeof callback !== "function") {
            throw new Error("A callback function is required");
        }
        if (node === null) return;
        callback(node);
        this.preOrderForEach(callback, node.left);
        this.preOrderForEach(callback, node.right);
    }

    // Postorder Traversal (Left, Right, Root)
    postOrderForEach(callback, node = this.root) {
        if (typeof callback !== "function") {
            throw new Error("A callback function is required");
        }
        if (node === null) return;
        this.postOrderForEach(callback, node.left);
        this.postOrderForEach(callback, node.right);
        callback(node);
    }
    
    // Helper: compute height of a node
    _height(node) {
        if (node === null) return -1;
        return 1 + Math.max(this._height(node.left), this._height(node.right));
    }
    
    // Height of a node containing given value
    height(value, node = this.root) {
        if (node === null) return null;
        if (value === node.data) return this._height(node);
        if (value < node.data) return this.height(value, node.left);
        return this.height(value, node.right);
    }
    
    // Depth of a node containing value
    depth(value, node = this.root, currentDepth = 0) {
        if (node === null) return null;
        if (node.data === value) return currentDepth;
        if (value < node.data) return this.depth(value, node.left, currentDepth + 1);
        return this.depth(value, node.right, currentDepth + 1);
    }

    // Check if tree is balanced
    isBalanced(node = this.root) {
        if (node === null) return true;

        const leftHeight = this._height(node.left);
        const rightHeight = this._height(node.right);

        if (Math.abs(leftHeight - rightHeight) > 1) return false;

        return this.isBalanced(node.left) && this.isBalanced(node.right);
    }

    // In-order traversal (sorted array)
    inOrder(node = this.root, arr = []) {
        if (node === null) return arr;
        this.inOrder(node.left, arr);
        arr.push(node.data);
        this.inOrder(node.right, arr);
        return arr;
    }

    // Rebalance tree
    rebalance() {
        const sortedValues = this.inOrder();
        this.root = this.buildTree(sortedValues);
    }
}