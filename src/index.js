import { Tree } from "./Tree";

// Utility to generate random array
function randomArray(size, max = 100) {
    return Array.from({ length: size }, () => Math.floor(Math.random() * max));
}

const array = randomArray(15, 100);
console.log("Random array:", array);

const tree = new Tree(array);

console.log("\nPretty Print Initial Tree:");
tree.prettyPrint();

console.log("\nIs tree balanced?", tree.isBalanced());

// Print traversals
const printTraversal = (label, fn) => {
  const results = [];
  fn(node => results.push(node.data));
  console.log(label, results.join(" "));
};

printTraversal("Level Order:", cb => tree.levelOrderForEach(cb));
printTraversal("Pre Order:", cb => tree.preOrderForEach(cb));
printTraversal("Post Order:", cb => tree.postOrderForEach(cb));
printTraversal("In Order:", cb => tree.inOrderForEach(cb));

// ---- Unbalance the tree ----
console.log("\n\nUnbalancing tree...");
tree.insert(150);
tree.insert(200);
tree.insert(250);
tree.insert(300);
tree.insert(400);

console.log("\nPretty Print Unbalanced Tree:");
tree.prettyPrint();

console.log("\nIs tree balanced?", tree.isBalanced());

// ---- Rebalance the tree ----
console.log("\nRebalancing tree...");
tree.rebalance();

console.log("\nPretty Print Rebalanced Tree:");
tree.prettyPrint();

console.log("\nIs tree balanced?", tree.isBalanced());

// Print traversals again
printTraversal("Level Order:", cb => tree.levelOrderForEach(cb));
printTraversal("Pre Order:", cb => tree.preOrderForEach(cb));
printTraversal("Post Order:", cb => tree.postOrderForEach(cb));
printTraversal("In Order:", cb => tree.inOrderForEach(cb));