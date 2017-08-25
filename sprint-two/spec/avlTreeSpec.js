describe('avlTree', function() {

  var avlTree;
  var testValues = [100, 80, 102, 52, 93, 180, 85, 97, 98, 99];
  var testValueDepths = [0, 1, 1, 2, 2, 2, 3, 3, 4, 5];
  var testValueBF = [-3, 3, 1, 0, 2, 0, 0, 2, 1, 0];
  var testValueParents = [null, 100, 100, 80, 80, 102, 93, 93, 97, 98];

  beforeEach(function() {
    avlTree = new AVLTree(100, 100);
  });

  it('should insert values into the AVL Tree', function() {
    for (var i = 0; i < 10000; i++) {
      var randomVal = Math.random();
      avlTree.insert(randomVal, randomVal);
      expect(avlTree.search(randomVal)).to.equal(randomVal);
    }
  });

  it('should correctly determine the parent of a node', function() {
    for (var i = 1; i < testValues.length; i++) {
      avlTree.insert(testValues[i], testValues[i]);
    }
    for (var i = 1; i < testValues.length; i++) {
      var node = avlTree._searchNode(testValues[i]);
      expect(node.parent.value).to.equal(testValueParents[i]);
    }
  });

  it('should apply a callback on each node of the tree using depth-first traversal', function() {
    var result = [];
    var expected = [100, 80, 52, 93, 85, 97, 98, 99, 102, 180];
    var cb = function(node) {
      result.push(node.value);
    };
    for (var i = 1; i < testValues.length; i++) {
      avlTree.insert(testValues[i], testValues[i]);
    }
    avlTree.depthFirstLog(cb);   
    expect(result).to.deep.equal(expected);

  });

  it('should correctly determine node depth for an AVL Tree node', function() {
    // We are only using testValues to make sure balance factors are correctly 
    // calculated before our implementation of balancing
    for (var i = 1; i < testValues.length; i++) {
      avlTree.insert(testValues[i], testValues[i]);
    }
    for (var i = 0; i < testValues.length; i++) {
      var node = avlTree._searchNode(testValues[i]);
      expect(node.depth).to.equal(testValueDepths[i]);
    }
  });

  it('should correctly determine node balance factor for an AVL Tree node (before implementation of balancing)', function() {
    // We are only using testValues to make sure balance factors are correctly 
    for (var i = 1; i < testValues.length; i++) {
      avlTree.insert(testValues[i], testValues[i]);
    }
    for (var i = 0; i < testValues.length; i++) {
      var node = avlTree._searchNode(testValues[i]);
      expect(node.getBalanceFactor()).to.equal(testValueBF[i]);
    }
  });  

  it('should correctly determine node blanace factor for an AVL Tree node as node are inserted', function() {
  });

});