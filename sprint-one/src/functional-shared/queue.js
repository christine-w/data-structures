var Queue = function() {
  // Hey! Rewrite in the new style. Your code will wind up looking very similar,
  // but try not not reference your old code in writing the new style.
  var queue = {};
  queue.count = 0;
  queue.head = 0;
  queue.storage = {};
  _.extend(queue, queueMethods);
  return queue;
};

var queueMethods = {
  size: function() {
    return this.count;
  },
  enqueue: function(value) {
    this.storage[this.head + this.count] = value;
    this.count++;
  },
  dequeue: function() {
    if (this.count > 0) {
      let value = this.storage[this.head];
      this.count--;
      this.head++;
      return value;
    }
  }
};


