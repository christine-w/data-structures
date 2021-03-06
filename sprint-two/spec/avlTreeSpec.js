describe('avlTree', function() {

  var avlTree;
  var avlNode;
  var testValues = [100, 80, 102, 52, 93, 180, 85, 97, 98, 99];
  var testValueDepths = [0, 1, 1, 2, 2, 2, 3, 3, 4, 5];
  var testValueBF = [-3, 3, 1, 0, 2, 0, 0, 2, 1, 0];
  var testValueParents = [null, 100, 100, 80, 80, 102, 93, 93, 97, 98];

  beforeEach(function() {
    avlTree = new AVLTree();
  });

  xit('should override toString method to return a human-readable string that represents the tree and its structure (for simple trees)', function() {
    var values = [100, 80, 102];
    for (var i = 0; i < values.length; i++) {
      avlTree.insert(values[i], values[i]);
    }
    var actual = avlTree.toString();
    var expected = '100, 100 (root)\n  L: 80, 80 (100)\n    L: null (80)\n    R: null (80)\n  R: 102, 102 (100)\n    L: null (102)\n    R: null (102)';
    expect(actual).to.equal(expected);
  });

  // Does NOT throw an error. For visual testing only.
  it('should override toString method to return a human-readable string that represents the tree and its structure (for complicated trees)', function() {
    for (var i = 0; i < testValues.length; i++) {
      avlTree.insert(testValues[i], testValues[i]);
    }
  });
   
  it('should insert values into the AVL Tree (random values)', function() {
    for (var j = 0; j < 100; j++) {
      for (var i = 0; i < 100; i++) {
        var randomVal = Math.floor(Math.random() * 100);
        avlTree.insert(randomVal, randomVal);
        expect(avlTree.search(randomVal)).to.equal(randomVal);
      }
    }
  });

  it('should insert values into the AVL Tree', function() {
    var values = [1, 35, 18, 34, 70, 55, 69, 79, 93, 5, 32, 12, 94, 76, 62, 2, 55, 61, 2, 94, 65, 51, 8, 25];
    // var values = [1, 35, 18, 34, 70, 55];
    for (var i = 0; i < values.length; i++) {
      avlTree.insert(values[i], values[i]);
      // console.log(avlTree.toString());
      expect(avlTree.search(values[i])).to.equal(values[i]);
    }
    
  });

  // it('should correctly determine the parent of a node', function() {
  //   for (var i = 1; i < testValues.length; i++) {
  //     avlTree.insert(testValues[i], testValues[i]);
  //   }
  //   for (var i = 1; i < testValues.length; i++) {
  //     var node = avlTree._searchNode(testValues[i]);
  //     expect(node.parent.value).to.equal(testValueParents[i]);
  //   }
  // });

  // it('should apply a callback on each node of the tree using depth-first traversal', function() {
  //   var result = [];
  //   var expected = [100, 80, 52, 93, 85, 97, 98, 99, 102, 180];
  //   var cb = function(node) {
  //     result.push(node.value);
  //   };
  //   for (var i = 1; i < testValues.length; i++) {
  //     avlTree.insert(testValues[i], testValues[i]);
  //   }
  //   avlTree.root.depthFirstLog(cb);   
  //   expect(result).to.deep.equal(expected);

  // });

  // it('should correctly determine node depth for an AVL Tree node', function() {
  //   // We are only using testValues to make sure balance factors are correctly 
  //   // calculated before our implementation of balancing
  //   for (var i = 1; i < testValues.length; i++) {
  //     avlTree.insert(testValues[i], testValues[i]);
  //   }
  //   for (var i = 0; i < testValues.length; i++) {
  //     var node = avlTree._searchNode(testValues[i]);
  //     expect(node.depth).to.equal(testValueDepths[i]);
  //   }
  // });

  // it('should correctly determine node balance factor for an AVL Tree node (before implementation of balancing)', function() {
  //   // We are only using testValues to make sure balance factors are correctly 
  //   for (var i = 1; i < testValues.length; i++) {
  //     avlTree.insert(testValues[i], testValues[i]);
  //   }
  //   for (var i = 0; i < testValues.length; i++) {
  //     var node = avlTree._searchNode(testValues[i]);
  //     expect(node.getBalanceFactor()).to.equal(testValueBF[i]);
  //   }
  // });

  // it('should update balance factors as nodes are inserted', function() {
  //   var values = [80, 102, 52];
  //   var balanceFactors = [[-1, 0], [0, 0, 0], [-1, -1, 0, 0]];
  //   var results = [];
  //   for (var i = 0; i < values.length; i++) {
  //     avlTree.insert(values[i], values[i]);
  //     var node = avlTree._searchNode(values[i]);
  //     var innerResults = [];
  //     avlTree.root.depthFirstLog(function(innerNode) {
  //       innerResults.push(innerNode.balanceFactor);
  //     });
  //     results.push(innerResults);
  //   }
  //   expect(results).to.deep.equal(balanceFactors);

  //   var avlNode2 = new AVLNode(100, 100);
  //   var avlTree2 = new AVLTree(avlNode2);   
  //   values = [80, 132, 131, 97, 180, 153, 110];
  //   balanceFactors = [[-1, 0], [0, 0, 0], [1, 0, -1, 0], [0, 1, 0, -1, 0], [0, 1, 0, 0, 0, 0], [1, 1, 0, 1, 0, -1, 0], [1, 1, 0, 0, -1, 0, -1, 0]];
  //   results = [];
  //   for (var i = 0; i < values.length; i++) {
  //     avlTree2.insert(values[i], values[i]);
  //     var node = avlTree2._searchNode(values[i]);
  //     var innerResults = [];
  //     avlTree2.root.depthFirstLog(function(innerNode) {
  //       innerResults.push(innerNode.balanceFactor);
  //     });
  //     results.push(innerResults);
  //   }
  //   expect(results).to.deep.equal(balanceFactors);  

  // });
  
  it('should rebalance with a simple right rotation in a left-left situation', function() {
    avlTree.insert(100, 100);
    avlTree.insert(80, 80);
    avlTree.insert(52, 52);
    expect(avlTree.root.value).to.equal(80);
    expect(avlTree.root.left.value).to.equal(52);
    expect(avlTree.root.right.value).to.equal(100);
    expect(avlTree.root.depth).to.equal(0);
    expect(avlTree.root.left.depth).to.equal(1);
    expect(avlTree.root.right.depth).to.equal(1);
    expect(avlTree.root.balanceFactor).to.equal(-1);
    expect(avlTree.root.left.balanceFactor).to.equal(0);
    expect(avlTree.root.right.balanceFactor).to.equal(0);
  });

  it('should rebalance with a simple left rotation in a right-right situation', function() {
    avlTree.insert(100, 100);
    avlTree.insert(130, 130);
    avlTree.insert(199, 199);
    expect(avlTree.root.value).to.equal(130);
    expect(avlTree.root.left.value).to.equal(100);
    expect(avlTree.root.right.value).to.equal(199);
    expect(avlTree.root.depth).to.equal(0);
    expect(avlTree.root.left.depth).to.equal(1);
    expect(avlTree.root.right.depth).to.equal(1);
    expect(avlTree.root.balanceFactor).to.equal(1);
    expect(avlTree.root.left.balanceFactor).to.equal(0);
    expect(avlTree.root.right.balanceFactor).to.equal(0);
  });  

  it('should rebalance with a double rotation in a left-right situation', function() {
    avlTree.insert(100, 100);
    avlTree.insert(52, 52);
    avlTree.insert(80, 80);
    expect(avlTree.root.value).to.equal(80);
    expect(avlTree.root.left.value).to.equal(52);
    expect(avlTree.root.right.value).to.equal(100);
    expect(avlTree.root.depth).to.equal(0);
    expect(avlTree.root.left.depth).to.equal(1);
    expect(avlTree.root.right.depth).to.equal(1);
    expect(avlTree.root.balanceFactor).to.equal(0);
    expect(avlTree.root.left.balanceFactor).to.equal(1);
    expect(avlTree.root.right.balanceFactor).to.equal(0);

    avlTree = new AVLTree();
    avlTree.insert(100, 100);
    avlTree.insert(92, 92);
    avlTree.insert(30, 30);
    avlTree.insert(50, 50);
    avlTree.insert(31, 31);
  });

  it('should rebalance with a double rotation in a right-left situation', function() {
    avlTree.insert(100, 100);
    avlTree.insert(199, 199);
    avlTree.insert(130, 130);
    expect(avlTree.root.value).to.equal(130);
    expect(avlTree.root.left.value).to.equal(100);
    expect(avlTree.root.right.value).to.equal(199);
    expect(avlTree.root.depth).to.equal(0);
    expect(avlTree.root.left.depth).to.equal(1);
    expect(avlTree.root.right.depth).to.equal(1);
    expect(avlTree.root.balanceFactor).to.equal(0);
    expect(avlTree.root.left.balanceFactor).to.equal(0);
    expect(avlTree.root.right.balanceFactor).to.equal(-1);
  });
});