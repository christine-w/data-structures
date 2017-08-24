

var HashTable = function() {
  this._limit = 8;
  this._storage = LimitedArray(this._limit);
};

HashTable.prototype.insert = function(k, v) {
  var index = getIndexBelowMaxForKey(k, this._limit);
  while (this._storage.get(index) !== undefined) {
    if (this._storage.get(index)[0] === k) {
      break;
    }
    index++;
    index %= this._limit;
  }
  this._storage.set(index, [k, v]);
};

HashTable.prototype.retrieve = function(k) {
  var baseIndex = getIndexBelowMaxForKey(k, this._limit);
  if (this._storage.get(baseIndex)) {
    for (var i = 0; i < this._limit; i++) {
      var currentIndex = (baseIndex + i) % this._limit;
      var pair = this._storage.get(currentIndex);
      if (pair && pair[0] === k) {
        return pair[1];
      }
    }
  }
};

HashTable.prototype.remove = function(k) {
  var index = getIndexBelowMaxForKey(k, this._limit);
  while (this._storage.get(index)[0] !== k) {
    index++;
    index %= this._limit;
  }
  this._storage.set(index, undefined);
};



/*
 * Complexity: What is the time complexity of the above functions?
 * insert: linear - O(n) where n is size of hashTable
 * retrieve: linear - O(n) where n is size of hashTable
 * remove: linear - O(n) where n is size of hashTable
 */


