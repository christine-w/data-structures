var AVLTree = function(key, value) {
  this.parent = null;
  this.left = null;
  this.right = null;
  this.key = key;
  this.value = value;
  this.depth = 0;
  this.balanceFactor = 0;
};

AVLTree.prototype.insert = function(key, value) {
  var newNode = new AVLTree(key, value);
  var currentNode = this;
  while (currentNode) {
    newNode.depth++;
    if (currentNode.key > key) {
      if (currentNode.left) {
        currentNode = currentNode.left;    
      } else {
        currentNode.left = newNode;
        newNode.parent = currentNode;
        break;
      }
    } else {
      if (currentNode.right) {
        currentNode = currentNode.right;
      } else {
        currentNode.right = newNode;
        newNode.parent = currentNode;
        break;
      }
    }
  }
};

AVLTree.prototype.search = function(key) {
  if (this.key === key) {
    return this.value;
  } else if (this.key > key) {
    if (this.left) {
      return this.left.search(key);
    } 
  } else {
    if (this.right) {
      return this.right.search(key);
    }
  } 
};

AVLTree.prototype._searchNode = function(key) {
  var resultNode;
  var cb = function(node) {
    if (node.key === key) {
      resultNode = node;
    }
  };
  this.depthFirstLog(cb);
  return resultNode;
};

AVLTree.prototype.depthFirstLog = function(callback) {
  var node = this;
  callback(node);
  if (node.left) {
    node.left.depthFirstLog(callback);
  }
  if (node.right) {
    node.right.depthFirstLog(callback);
  }
};

// AVLTree.prototype.updateHeight = function() {
// };

AVLTree.prototype.updateBalanceFactor = function() {
};

AVLTree.prototype.getBalanceFactor = function() {
  var maxRightDepth = this.depth;
  var maxLeftDepth = this.depth;
  var cbRight = function(node) {
    if (node.depth > maxRightDepth) {
      maxRightDepth = node.depth;
    }
  };
  var cbLeft = function(node) {
    if (node.depth > maxLeftDepth) {
      maxLeftDepth = node.depth;
    }
  };
  if (this.right) {
    this.right.depthFirstLog(cbRight); 
  }
  if (this.left) {
    this.left.depthFirstLog(cbLeft);
  }

  return maxRightDepth - maxLeftDepth;
};