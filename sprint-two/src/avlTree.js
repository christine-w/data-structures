var AVLTree = function(node) {
  this.root = node;
};


AVLTree.prototype.insert = function(key, value) {
  var newNode = new AVLNode(key, value);
  var currentNode = this.root;
  while (currentNode) {
    newNode.depth++;
    if (currentNode.key > key) {
      if (currentNode.left) {
        currentNode = currentNode.left;
      } else {
        currentNode.left = newNode;
        newNode.parent = currentNode;
        currentNode.updateBalanceFactor();
        break;
      }
    } else {
      if (currentNode.right) {
        currentNode = currentNode.right;
      } else {
        currentNode.right = newNode;
        newNode.parent = currentNode;
        currentNode.updateBalanceFactor();
        break;
      }
    }
  }
};

AVLTree.prototype.search = function(key) {
  var currentNode = this.root;
  while (currentNode) {
    if (currentNode.key === key) {
      return currentNode.value;
    } else if (currentNode.key > key) {
      currentNode = currentNode.left;
    } else {
      currentNode = currentNode.right;
    }
  }
};

AVLTree.prototype._searchNode = function(key) {
  var currentNode = this.root;
  while (currentNode) {
    if (currentNode.key === key) {
      return currentNode;
    } else if (currentNode.key > key) {
      currentNode = currentNode.left;
    } else {
      currentNode = currentNode.right;
    }
  }
};

// AVLTree.prototype.rotateLeft = function() {
// };

// AVLTree.prototype.rotateRight = function() {
// };

var AVLNode = function(key, value) {
  this.parent = null;
  this.left = null;
  this.right = null;
  this.key = key;
  this.value = value;
  this.depth = 0;
  this.balanceFactor = 0;
};

AVLNode.prototype.depthFirstLog = function(callback) {
  var node = this;
  callback(node);
  if (node.left) {
    node.left.depthFirstLog(callback);
  }
  if (node.right) {
    node.right.depthFirstLog(callback);
  }
};

AVLNode.prototype.updateBalanceFactor = function() {
  this.balanceFactor = this.getBalanceFactor();
  if (this.balanceFactor === 1 || this.balanceFactor === -1) {
    if (this.parent) {
      this.parent.updateBalanceFactor();
    }
  } else if (this.balanceFactor === 2) {
    this.rotateLeft;
  } else if (this.balanceFactor === -2) {
    this.rotateRight;
  }
};

AVLNode.prototype.getBalanceFactor = function() {
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
