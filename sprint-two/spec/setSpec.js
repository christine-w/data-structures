describe('set', function() {
  var set;

  beforeEach(function() {
    set = Set();
  });

  it('should have methods named "add", "contains", and "remove"', function() {
    expect(set.add).to.be.a('function');
    expect(set.contains).to.be.a('function');
    expect(set.remove).to.be.a('function');
  });

  it('should add string values to a set', function() {
    set.add('Susan Sarandon');
    set.add('Danny Glover');
    expect(set.contains('Danny Glover')).to.equal(true);
    expect(set.contains('Susan Sarandon')).to.equal(true);
  });

  it('should only add every distinct value once', function() {
    set.add('hello');
    set.add('hello');
    set.remove('hello');
    expect(set.contains('hello')).to.equal(false);
  });

  it('should remove values from a set', function() {
    set.add('Mel Gibson');
    set.remove('Mel Gibson');
    expect(set.contains('Mel Gibson')).to.equal(false);
  });

  it('should add any primitive values to a set', function() {
    set.add(1);
    set.add(true);
    set.add(null);
    expect(set.contains(1)).to.equal(true);
    expect(set.contains(true)).to.equal(true);
    expect(set.contains(null)).to.equal(true);
  });

  it('should add arrays, objects and functions to a set', function() {
    set.add([1, 2, 3]);
    set.add({ 1: 'a', 2: 'b', 3: 'c'});
    set.add(function() {});
    expect(set.contains([1, 2, 3])).to.equal(true);
    expect(set.contains({ 1: 'a', 2: 'b', 3: 'c'})).to.equal(true);
    expect(set.contains(function() {})).to.equal(true);
  });

});
