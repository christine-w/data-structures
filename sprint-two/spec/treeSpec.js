describe('tree', function() {
  var tree;

  beforeEach(function() {
    tree = Tree();
  });

  it('should have methods named "addChild" and "contains", and a property named "value"', function() {
    expect(tree.addChild).to.be.a('function');
    expect(tree.contains).to.be.a('function');
    expect(tree.hasOwnProperty('value')).to.equal(true);
  });

  it('should add children that is an integer to the tree', function() {
    tree.addChild(5);
    expect(tree.children[0].value).to.equal(5);
  });

  it('should add children of any primitive type to the tree', function() {
    tree.addChild('apple');
    expect(tree.contains('apple')).to.equal(true);
    tree.addChild(false);
    expect(tree.contains(false)).to.equal(true);
    tree.addChild(null);
    expect(tree.contains(null)).to.equal(true);
  });
  
  it('should add children of the type object, function or array to the tree', function() {
    tree.addChild([1, false, null]);
    expect(tree.contains([1, false, null])).to.equal(true);
    tree.addChild(function() {});
    expect(tree.contains(function() {})).to.equal(true);
    tree.addChild({1: 'a', 2: 'b'});
    expect(tree.contains({1: 'a', 2: 'b'})).to.equal(true);
  });

  it('should return true for a value that the tree contains', function() {
    tree.addChild(5);
    expect(tree.contains(5)).to.equal(true);
  });

  it('should return false for a value that was not added', function() {
    tree.addChild(5);
    expect(tree.contains(6)).to.equal(false);
  });

  it('should be able to add children to a tree\'s child', function() {
    tree.addChild(5);
    tree.children[0].addChild(6);
    expect(tree.children[0].children[0].value).to.equal(6);
  });

  it('should correctly detect nested children', function() {
    tree.addChild(5);
    tree.addChild(6);
    tree.children[0].addChild(7);
    tree.children[1].addChild(8);
    expect(tree.contains(7)).to.equal(true);
    expect(tree.contains(8)).to.equal(true);
  });

});
