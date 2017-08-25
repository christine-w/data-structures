describe('hashTable', function() {
  var hashTable;
  var people = [['Steven', 'Tyler'], ['George', 'Harrison'], ['Mr.', 'Doob'], ['Dr.', 'Sunshine'], ['John', 'Resig'], ['Brendan', 'Eich'], ['Alan', 'Turing']];


  beforeEach(function() {
    hashTable = new HashTable();
  });

  it('should have methods named "insert", "remove", and "retrieve', function() {
    expect(hashTable.insert).to.be.a('function');
    expect(hashTable.remove).to.be.a('function');
    expect(hashTable.retrieve).to.be.a('function');
  });

  it('should store values that were inserted', function() {
    hashTable.insert('Steven', 'Seagal');
    expect(hashTable.retrieve('Steven')).to.equal('Seagal');
  });

  it('should not contain values that were not inserted', function() {
    hashTable.insert('Steven', 'Spielberg');
    expect(hashTable.retrieve('Steven')).not.to.equal('Seagal');
  });

  it('should overwrite values that have the same key', function() {
    hashTable.insert('Bob', 'Loblaw');
    hashTable.insert('Bob', 'Barker');
    expect(hashTable.retrieve('Bob')).to.equal('Barker');
  });

  it('should not contain values that were removed', function() {
    hashTable.insert('Steven', 'Tyler');
    hashTable.remove('Steven');
    expect(hashTable.retrieve('Steven')).to.equal(undefined);
  });

  it('should handle hash function collisions on inserts and retrieves', function() {
    var v1 = 'val1';
    var v2 = 'val2';
    var oldHashFunction = window.getIndexBelowMaxForKey;
    window.getIndexBelowMaxForKey = function() { return 0; };
    hashTable.insert(v1, v1);
    hashTable.insert(v2, v2);
    expect(hashTable.retrieve(v1)).to.equal(v1);
    expect(hashTable.retrieve(v2)).to.equal(v2);
    window.getIndexBelowMaxForKey = oldHashFunction;
  });

  it('should handle hash function collisions on removes', function() {
    var v1 = 'val1';
    var v2 = 'val2';
    var oldHashFunction = window.getIndexBelowMaxForKey;
    window.getIndexBelowMaxForKey = function() { return 0; };
    hashTable.insert(v1, v1);
    hashTable.insert(v2, v2);
    hashTable.remove(v2);
    expect(hashTable.retrieve(v1)).to.equal(v1);
    expect(hashTable.retrieve(v2)).to.equal(undefined);
    window.getIndexBelowMaxForKey = oldHashFunction;
  });

  it('should store a variable that tracks the number of used indices in the hash table', function() {
    var oldHashFunction = window.getIndexBelowMaxForKey;
    var hashIndex = 0;
    window.getIndexBelowMaxForKey = function() {
      hashIndex++; 
      return hashIndex % 3;
    };    
    hashTable.insert(1, 1);
    hashTable.insert(2, 2);
    hashTable.insert(3, 3);
    hashTable.insert(4, 4);
    hashTable.insert(5, 5);
    expect(hashTable._count).to.equal(5);
    window.getIndexBelowMaxForKey = oldHashFunction;
  });
  
  // intermediary test before resizing is implemented
  xit('should recognize when the hashTable is at least 75% full', function() {
    var oldHashFunction = window.getIndexBelowMaxForKey;
    var hashIndex = 0;
    window.getIndexBelowMaxForKey = function() {
      hashIndex++; 
      return hashIndex % 8;
    };    

    hashTable.insert(1, 1);
    expect(hashTable.isAlmostFull()).to.equal(false);
    hashTable.insert(2, 2);
    expect(hashTable.isAlmostFull()).to.equal(false);
    hashTable.insert(3, 3);
    expect(hashTable.isAlmostFull()).to.equal(false);
    hashTable.insert(4, 4);
    expect(hashTable.isAlmostFull()).to.equal(false);
    hashTable.insert(5, 5);
    expect(hashTable.isAlmostFull()).to.equal(false);
    hashTable.insert(6, 6);
    expect(hashTable.isAlmostFull()).to.equal(true);

    window.getIndexBelowMaxForKey = oldHashFunction;
  });
  
  // (Advanced! Remove the extra "x" when you want the following tests to run)
  it ('should double in size when needed', function() {
    _.each(people, function(person) {
      var firstName = person[0];
      var lastName = person[1];
      hashTable.insert(firstName, lastName);
      expect(hashTable.retrieve(firstName)).to.equal(lastName);
    });
    expect(hashTable._limit).to.equal(16);
  });

  it ('should be able to retrieve everything correctly after doubling size', function() {
    var oldHashFunction = window.getIndexBelowMaxForKey;
    window.getIndexBelowMaxForKey = function(k, limit) {
      return k % limit;
    };

    var values = [1, 9, 3, 17, 6, 14];

    for (var i = 0; i < values.length; i++) {
      hashTable.insert(values[i], values[i]);
    }

    for (var i = 0; i < values.length; i++) {
      expect(hashTable.retrieve(values[i])).to.equal(values[i]);
    }

    window.getIndexBelowMaxForKey = oldHashFunction;
  });

  it ('should halve in size when needed', function() {
    _.each(people, function(person) {
      var firstName = person[0];
      var lastName = person[1];
      hashTable.insert(firstName, lastName);
      expect(hashTable.retrieve(firstName)).to.equal(lastName);
    });
    expect(hashTable._limit).to.equal(16);
    hashTable.remove('George');
    hashTable.remove('Dr.');
    hashTable.remove('Steven');
    hashTable.remove('John');
    hashTable.remove('Mr.');
    expect(hashTable._limit).to.equal(8);
  });

  it ('should be able to retrieve everything correctly after resizing (with random insertion/removal)', function() {
    var valuesInHash = [];
    for (var i = 0; i < 10000; i++) {
      var randomVar = Math.random();
      var randomVal = Math.floor(Math.random() * 1000);
      if (randomVar > 0.5) {
        hashTable.insert(randomVal, randomVal);
        valuesInHash[randomVal] = randomVal;
      } else {
        hashTable.remove(randomVal);
        valuesInHash[randomVal] = undefined;
      }
      expect(hashTable.retrieve(randomVal)).to.equal(valuesInHash[randomVal]);
    }
  });
});
