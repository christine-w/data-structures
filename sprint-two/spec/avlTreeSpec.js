describe('avlTree', function() {

  var avlTree;

  beforeEach(function() {
    avlTree = new AVLTree(5);
  });

  it('should insert values into the tree', function() {
    avlTree.insert(8);
    expect(avlTree.contains(8)).to.equal(true);
    avlTree.insert(3);
    avlTree.insert(12);
    avlTree.insert(1);
    avlTree.insert(7);
    avlTree.insert(-2);
    expect(avlTree.contains(3)).to.equal(true);
    expect(avlTree.contains(12)).to.equal(true);
    expect(avlTree.contains(1)).to.equal(true);
    expect(avlTree.contains(7)).to.equal(true);
    expect(avlTree.contains(-2)).to.equal(true);
  });

});