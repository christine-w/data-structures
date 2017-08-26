var AVLTree = function(node) {
  this.root = node;
};


AVLTree.prototype.insert = function(key, value) {
  var newNode = new AVLNode(key, value);
  this.root.insert(newNode);
  if (newNode.parent.parent) {
    this.rotateIfNeeded(newNode.parent.parent);
  }
};

AVLTree.prototype.rotateIfNeeded = function(node) {        
  if (node.balanceFactor === 2) {
    if (node.right.balanceFactor < 0) {
      // do an extra rotation (double rotation) in a right-left situation
      // should become a right-right situation after the rotation
      this.rotate(node.right.left, node.right, true);
    }
    // do a simple rotation in a right-right situation
    this.rotate(node, node.right, false);
  } else if (node.balanceFactor === -2) {
    if (node.left.balanceFactor > 0) {
      // do an extra rotation (double rotation) in a left-right situation
      // should become a left-left situation after the rotation
      this.rotate(node.left, node.left.right, false);
    }
    // do a simple rotation in a left-left situation
    this.rotate(node.left, node, true);
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

AVLTree.prototype.rotate = function(left, right, isClockwise) {
  if (!isClockwise) {
    right.parent = left.parent;
    if (left.parent) {
      left.parent.right = right;
    } else {
      this.root = right;
    }
    left.right = right.left;
    left.parent = right;
    right.left = left;
  } else {
    left.parent = right.parent;
    if (right.parent) {
      right.parent.left = left;
    } else {
      this.root = left;
    }
    right.left = left.right;
    right.parent = left;
    left.right = right;
  }
};

var AVLNode = function(key, value) {
  this.parent = null;
  this.left = null;
  this.right = null;
  this.key = key;
  this.value = value;
  this.depth = 0;
  this.balanceFactor = 0;
};

AVLNode.prototype.insert = function(node) {
  node.depth++;
  if (this.key > node.key) {
    if (this.left) {
      this.left.insert(node);
    } else {
      this.left = node;
      node.parent = this;
      this.updateBalanceFactor();
    }
  } else {
    if (this.right) {
      this.right.insert(node);
    } else {
      this.right = node;
      node.parent = this;
      this.updateBalanceFactor();
    } 
  }
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
