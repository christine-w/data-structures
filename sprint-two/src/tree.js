var Tree = function(value) {
  var newTree = Object.create(treeMethods);
  newTree.value = value;

  // your code here
  newTree.children = []; 

  return newTree;
};

var treeMethods = {};

treeMethods.addChild = function(value) {
  var tree = Tree(value);
  this.children.push(tree);
};

treeMethods.contains = function(target) {
  for (let i = 0; i < this.children.length; i++) {
    let stringifiedValue = JSON.stringify(this.children[i].value);
    let stringifiedTarget = JSON.stringify(target);
    if (stringifiedValue === stringifiedTarget) {
      return true;
    } else {
      if (this.children[i].contains(target)) {
        return true;
      }
    }
  }
  return false;
};



/*
 * Complexity: What is the time complexity of the above functions?
 * addChild - constant -- O(1)
 * contains - linear -- O(n) where n is the number of nodes in the tree
 */
