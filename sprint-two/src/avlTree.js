var AVLTree = function(value) {
  this.left = null;
  this.right = null;
  this.value = value;
};

AVLTree.prototype.insert = function(value) {
  if (this.value > value) {
    if (this.left) {
      this.left.insert(value);
    } else {
      this.left = new AVLTree(value);
    }
  } else {
    if (this.right) {
      this.right.insert(value);
    } else {
      this.right = new AVLTree(value);
    }
  }
};

AVLTree.prototype._search = function(value) {
//returns AVLTree -- for testing purposes
};

AVLTree.prototype.contains = function(value) {
  if (this.value === value) {
    return true;
  } else if (this.value > value) {
    if (this.left) {
      return this.left.contains(value);
    } else {
      return false;
    }
  } else {
    if (this.right) {
      return this.right.contains(value);
    } else {
      return false;
    }
  }
  
};

AVLTree.prototype.depthFirstLog = function(callback) {
};

AVLTree.prototype.getHeight = function() {
};

AVLTree.prototype.getBalanceFactor = function() {
};