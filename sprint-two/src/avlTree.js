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
  if (Math.abs(node.balanceFactor) === 2) {
    if (node.balanceFactor > 0) {
      if (node.right.balanceFactor < 0) {
        // do an extra rotation (double rotation) in a right-left situation
        // should become a right-right situation after the rotation
        this.rotate(node.right.left, node.right, true, true);
      }
      // do a simple rotation in a right-right situation
      this.rotate(node, node.right, false, false);
    } else if (node.balanceFactor < 0) {
      if (node.left.balanceFactor > 0) {
        // do an extra rotation (double rotation) in a left-right situation
        // should become a left-left situation after the rotation
        this.rotate(node.left, node.left.right, false, true);
      }
      // do a simple rotation in a left-left situation
      this.rotate(node.left, node, true, false);
    }
    node.parent.updateDepth();
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

AVLTree.prototype.rotate = function(left, right, isClockwise, firstOfDouble) {
  var parent = isClockwise ? right.parent : left.parent;
  var innerChild = isClockwise ? left.right : right.left;
  // regardless of rotation direction,
  // reassign pointers in a top-down, left-to-right order with respect to the final tree
  if (isClockwise) {
    if (firstOfDouble) {
      // for a right-left rotation
      parent.right = left;
    } else {
      // for a left-left rotation
      if (parent) {
        if (parent.left = right) {
          parent.left = left;
        } else {
          parent.right = left;
        }
      } else {
        this.root = left;
      }
    }
    left.parent = parent;
    left.right = right;
    right.parent = left;
    right.left = innerChild;
  } else {
    if (firstOfDouble) {
      // for a left-right rotation
      parent.left = right;
    } else {
      // for a right-right rotation
      if (parent) {
        if (parent.right = left) {
          parent.right = right;
        } else {
          parent.left = right;
        }
      } else {
        this.root = right;
      }
    }
    right.parent = parent;
    right.left = left;
    left.parent = right;
    left.right = innerChild;
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

AVLNode.prototype.updateDepth = function() {
  if (this.parent) {
    this.depth = this.parent.depth + 1;
  } else {
    this.depth = 0;
  }
  if (this.left) {
    this.left.updateDepth();
  }
  if (this.right) {
    this.right.updateDepth();
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
