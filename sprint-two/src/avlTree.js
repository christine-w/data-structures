var AVLTree = function(node) {
  this.root = node;
};

// Create a new node from a key value pair, and add it to the tree
AVLTree.prototype.insert = function(key, value) {
  var newNode = new AVLNode(key, value);
  this.root.insert(newNode);
  // If newNode's parent does not have a parent, then it is the root,
  // and the tree does not need a re-balance yet (|balance factor| must be < 2).
  // Otherwise, check if it needs a rotation
  if (newNode.parent.parent) {
    this._rotateIfNeeded(newNode.parent.parent);
  }
};

// Check if the node is heavily unbalanced (|balanceFactor| >= 2),
// and do either a double rotation or a simple rotation based on the subtree configuration
AVLTree.prototype._rotateIfNeeded = function(node) {
  if (Math.abs(node.balanceFactor) === 2) {
    if (node.balanceFactor > 0) {
      if (node.right.balanceFactor < 0) {
        // Do an extra rotation (double rotation) in a right-left situation
        // Should become a right-right situation after the rotation
        this._rotate(node.right.left, node.right, true, true);
      }
      // Do a simple rotation in a right-right situation
      this._rotate(node, node.right, false, false);
    } else if (node.balanceFactor < 0) {
      if (node.left.balanceFactor > 0) {
        // Do an extra rotation (double rotation) in a left-right situation
        // Should become a left-left situation after the rotation
        this._rotate(node.left, node.left.right, false, true);
      }
      // Do a simple rotation in a left-left situation
      this._rotate(node.left, node, true, false);
    }
    // Recursively update depth property of nodes in node's parent's subtree (recurse downwards)
    node.parent._updateDepth();
    node._updateBalanceFactor();
  }
};

// Given a key, lookup and return its value using binary search (undefined if not found)
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

// Given a key, lookup and return the corresponding AVLNode object using binary search (undefined if not found)
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

// Do a single rotation on two nodes, given the relative position of the nodes (left/right),
// the direction of rotation, and whether it is the first rotation in a double rotation (left-right or right-left situation)
AVLTree.prototype._rotate = function(left, right, isClockwise, firstOfDouble) {
  // Create pointer to parent of the node higher in the tree
  var parent = isClockwise ? right.parent : left.parent;
  // Create pointer to the innerChild subtree
  var innerChild = isClockwise ? left.right : right.left;
  // Regardless of rotation direction,
  // reassign pointers in a top-down, left-to-right order with respect to the final tree
  if (isClockwise) {
    if (firstOfDouble) {
      // For a right-left rotation
      parent.right = left;
    } else {
      // For a left-left rotation
      if (parent) {
        if (parent.left = right) {
          parent.left = left;
        } else {
          parent.right = left;
        }
      } else {
        // If the upper node does not have a parent, it is the root,
        // and the AVLTree's root property will point to the new root after rotation
        this.root = left;
      }
    }
    // Update pointers to reflect the configuration of the tree after rotation
    left.parent = parent;
    left.right = right;
    right.parent = left;
    right.left = innerChild;
  } else {
    if (firstOfDouble) {
      // For a left-right rotation
      parent.left = right;
    } else {
      // For a right-right rotation
      if (parent) {
        if (parent.right = left) {
          parent.right = right;
        } else {
          parent.left = right;
        }
      } else {
        // If the upper node does not have a parent, it is the root,
        // and the AVLTree's root property will point to the new root after rotation
        this.root = right;
      }
    }
    // Update pointers to reflect the configuration of the tree after rotation
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
  // An AVLTree property used for maintaining balance
  this.balanceFactor = 0;
};

// Recursively insert an AVLNode into the current node's subtree
AVLNode.prototype.insert = function(node) {
  node.depth++;
  if (this.key > node.key) {
    if (this.left) {
      this.left.insert(node);
    } else {
      this.left = node;
      node.parent = this;
      this._updateBalanceFactor();
    }
  } else {
    if (this.right) {
      this.right.insert(node);
    } else {
      this.right = node;
      node.parent = this;
      this._updateBalanceFactor();
    } 
  }
};

// Recursively traverse through the tree in a depth-first order and apply the callback function to each node
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

// Recursively update depth property of the current node and its children
AVLNode.prototype._updateDepth = function() {
  if (this.parent) {
    this.depth = this.parent.depth + 1;
  } else {
    this.depth = 0;
  }
  if (this.left) {
    this.left._updateDepth();
  }
  if (this.right) {
    this.right._updateDepth();
  }
};

// Recursively update balanceFactor property of the current node.
// If balanceFactor is 0, the subtree is balanced enough, and does not need rebalancing.
// If |balanceFactor| is 1, the AVLTree might need a re-balance,
// therefore recurse upward and update balanceFactor of its ancestors.
AVLNode.prototype._updateBalanceFactor = function() {
  this.balanceFactor = this._getBalanceFactor();
  if (this.balanceFactor === 1 || this.balanceFactor === -1) {
    if (this.parent) {
      this.parent._updateBalanceFactor();
    }
  } 
};

// Use depthFirstLog to find the maximum depth of left subtree and right subtree
// to calculate balanceFactor of current node.
AVLNode.prototype._getBalanceFactor = function() {
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
