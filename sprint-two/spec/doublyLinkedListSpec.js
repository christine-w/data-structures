describe('doublyLinkedList', function() {

  var doublyLinkedList;

  beforeEach(function() {
    doublyLinkedList = new DoublyLinkedList();
  });

  it('should have functions "addToTail", "removeHead", "contains", "addToHead", "removeTail"', function() {
    expect(doublyLinkedList.addToTail).to.be.a('function');
    expect(doublyLinkedList.removeHead).to.be.a('function');
    expect(doublyLinkedList.contains).to.be.a('function');
    expect(doublyLinkedList.addToHead).to.be.a('function');
    expect(doublyLinkedList.removeTail).to.be.a('function');
  });

  it('should add element to doubly linked list using addToTail', function() {
    doublyLinkedList.addToTail(1);
    expect(doublyLinkedList.contains(1)).to.equal(true);
    doublyLinkedList.addToTail(2);
    expect(doublyLinkedList.contains(2)).to.equal(true);
  });


  it('should add element to doubly linked list using addtoHead', function() {
    doublyLinkedList.addToHead(1);
    expect(doublyLinkedList.contains(1)).to.equal(true);
    doublyLinkedList.addToHead(2);
    expect(doublyLinkedList.contains(2)).to.equal(true);
  });

  it('should remove element and return it from doubly linked list when removeHead is called', function() {
    expect(doublyLinkedList.removeHead()).to.equal(undefined);
    doublyLinkedList.addToHead(1);
    expect(doublyLinkedList.removeHead()).to.equal(1);
    doublyLinkedList.addToHead(2);
    doublyLinkedList.addToHead(3);
    doublyLinkedList.addToTail(4);
    expect(doublyLinkedList.removeHead()).to.equal(3);
    expect(doublyLinkedList.contains(2)).to.equal(true);
    expect(doublyLinkedList.contains(4)).to.equal(true);
    expect(doublyLinkedList.contains(3)).to.equal(false);
  });

  it('should remove element and return it from doubly linked list when removeTail is called', function() {
    expect(doublyLinkedList.removeTail()).to.equal(undefined);
    doublyLinkedList.addToHead(1);
    expect(doublyLinkedList.removeTail()).to.equal(1);
    doublyLinkedList.addToTail(2);
    doublyLinkedList.addToHead(3);
    doublyLinkedList.addToTail(4);
    expect(doublyLinkedList.removeTail()).to.equal(4);
    expect(doublyLinkedList.contains(2)).to.equal(true);
    expect(doublyLinkedList.contains(3)).to.equal(true);
    expect(doublyLinkedList.contains(4)).to.equal(false);
    expect(doublyLinkedList.removeTail()).to.equal(2);
    expect(doublyLinkedList.contains(3)).to.equal(true);
    expect(doublyLinkedList.contains(2)).to.equal(false);
  });
});