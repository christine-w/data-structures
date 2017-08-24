

var HashTable = function() {
  this._limit = 8;
  this._storage = LimitedArray(this._limit);
};

HashTable.prototype.insert = function(k, v) {
  var index = getIndexBelowMaxForKey(k, this._limit);
  if (!this._storage[index]) {
    this._storage[index] = LinkedList();
  }
  var list = this._storage[index];
  var node = list.head;
  while (node) {
    if (node.value[0] === k) {
      node.value[1] = v;
      return;
    }
    node = node.next;
  }
  list.addToTail([k, v]);
};

HashTable.prototype.retrieve = function(k) {
  var index = getIndexBelowMaxForKey(k, this._limit);
  var list = this._storage[index];
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
  if (this._storage[index]) {
    var list = this._storage[index];
    var node = list.head;
    var prev;
    while (node) {
      if (node.value[0] === k) {
        if (prev) {
          prev.next = node.next;
        } else {
          list.removeHead();
        }
        return;
      } else {
        prev = node;
        node = node.next;
      }
    }
  }
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


