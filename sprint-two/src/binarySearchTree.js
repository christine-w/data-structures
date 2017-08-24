var BinarySearchTree = function(value) {
  var tree = Object.create(BinarySearchTree.prototype);
  tree.value = value;
  tree.left = null;
  tree.right = null;
  return tree;
};
BinarySearchTree.prototype.contains = function(value) {
  if (this.value === value) {
    return true;
  }
  if (this.value < value) {
    if (this.right === null) {
      return false;
    } else {
      return this.right.contains(value);
    }
  } else {
    if (this.left === null) {
      return false; 
    } else {
      return this.left.contains(value);
    }
  }
};

BinarySearchTree.prototype.insert = function(value) {
  if (this.value < value) {
    if (this.right === null) {
      this.right = BinarySearchTree(value);
    } else {
      this.right.insert(value);
    }
  } else {
    if (this.left === null) {
      this.left = BinarySearchTree(value); 
    } else {
      this.left.insert(value);
    }
  }
};

BinarySearchTree.prototype.depthFirstLog = function(cb) {
  cb(this.value);

  if (this.left) {
    this.left.depthFirstLog(cb);
  }
  if (this.right) {
    this.right.depthFirstLog(cb);
  }
};

/*
 * Complexity: What is the time complexity of the above functions?
 * contains - linear -- O(n) where n is the number of nodes as this is not a balanced tree
 * insert - linear -- O(n) where n is the number of nodes as this is not a balanced tree
 * depthFirstLog - linear -- O(n) where n is the number of nodes
 */
