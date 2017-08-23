var Queue = function() {
  var someInstance = {};

  // Use an object with numeric keys to store values
  var storage = {};
  var head = 0;
  var count = 0;

  // Implement the methods below

  someInstance.enqueue = function(value) {
    storage[head + count] = value;
    count++;
  };

  someInstance.dequeue = function() {
    if (count > 0) {
      var value = storage[head];
      head++;
      count--;
      return value;
    }
  };

  someInstance.size = function() {
    return count;
  };

  return someInstance;
};
