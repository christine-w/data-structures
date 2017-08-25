var DoublyLinkedList = function() {
  this.head = null;
  this.tail = null;
};

DoublyLinkedList.prototype.addToTail = function(value) {
  var node = new DLLNode(value);
  if (!this.head) {
    this.head = node;
  } else {
    this.tail.next = node;
    node.prev = this.tail;
  }
  this.tail = node;
};

DoublyLinkedList.prototype.addToHead = function(value) {
  var node = new DLLNode(value);
  if (!this.head) {
    this.tail = node;
  } else {
    this.head.prev = node;
    node.next = this.head;
  }
  this.head = node;
};

DoublyLinkedList.prototype.contains = function(target) {
  if (this.head) {
    var node = this.head;
    while (node) {
      if (node.value === target) {
        return true;
      }
      node = node.next;
    }
  }
  return false;   
};

DoublyLinkedList.prototype.removeHead = function() {
  if (this.head) {
    var val = this.head.value;
    if (this.head.next) {
      this.head.next.prev = null;
    } else {
      this.tail = null;
    }
    this.head = this.head.next;
    return val;
  }
};

DoublyLinkedList.prototype.removeTail = function() {
  if (this.tail) {
    var val = this.tail.value;
    if (this.tail.prev) {
      this.tail.prev.next = null;
    } else {
      this.head = null;
    }
    this.tail = this.tail.prev;
    return val;
  }
};

var DLLNode = function(value) {
  this.value = value;
  this.prev = null;
  this.next = null;
};

