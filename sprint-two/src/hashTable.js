

var HashTable = function(limit = 8) {
  this._limit = limit;
  this._storage = LimitedArray(this._limit);
  this._count = 0;
};

HashTable.prototype.insert = function(k, v) {
  var index = getIndexBelowMaxForKey(k, this._limit);
  if (!this._storage.get(index)) {
    this._storage.set(index, LinkedList());
  }
  var list = this._storage.get(index);
  var node = list.head;
  while (node) {
    if (node.value[0] === k) {
      node.value[1] = v;
      return;
    }
    node = node.next;
  }
  list.addToTail([k, v]);
  this._count++;
  if (this.isAlmostFull()) {
    this.double();
  }
};

HashTable.prototype.retrieve = function(k) {
  var index = getIndexBelowMaxForKey(k, this._limit);
  var list = this._storage.get(index);
  if (list) {
    var node = list.head;
    while (node) {
      if (node.value[0] === k) {
        return node.value[1];
      }
      node = node.next;
    }
  }
};

HashTable.prototype.remove = function(k) {
  var index = getIndexBelowMaxForKey(k, this._limit);
  if (this._storage.get(index)) {
    var list = this._storage.get(index);
    var node = list.head;
    var prev;
    while (node) {
      if (node.value[0] === k) {
        if (prev) {
          if (node.next === null) {
            list.tail = prev;
          }
          prev.next = node.next;
        } else {
          list.removeHead();
        }
        this._count--;
        if (this.isAlmostEmpty()) {
          this.half();
        }
        return;
      } else {
        prev = node;
        node = node.next;
      }
    }
  }
};

HashTable.prototype.isAlmostFull = function() {
  return this._count / this._limit >= 0.75;
};

HashTable.prototype.isAlmostEmpty = function() {
  return this._count / this._limit < 0.25;
};

HashTable.prototype.resize = function(limit) {
  this._limit = limit;
  var oldStorage = this._storage;
  this._storage = LimitedArray(this._limit);
  this._count = 0;
  this.copyFrom(oldStorage);
};

HashTable.prototype.double = function() {
  this.resize(this._limit * 2);
};

HashTable.prototype.half = function() {
  this.resize(this._limit / 2);
};

HashTable.prototype.copyFrom = function(oldStorage) {
  var hashTable = this;
  oldStorage.each(function(list) {
    if (list) {
      var node = list.head;
      while (node) {
        hashTable.insert(node.value[0], node.value[1]);
        node = node.next;
      }
    }
  });
};


/*
 * Complexity: What is the time complexity of the above functions?
 * insert: between constant and linear - O(1) to O(n/k)
 *         where n is total number of values, and k is the maximum size of the hash table
 * retrieve: between constant and linear - O(1) to O(n/k)
 *           where n is total number of values, and k is the maximum size of the hash table
 * remove: between constant and linear - O(1) to O(n/k)
 *         where n is total number of values, and k is the maximum size of the hash table
 */


