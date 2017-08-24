

// Instantiate a new graph
var Graph = function() {
  this.nodesAndEdges = {};
};

// Add a node to the graph, passing in the node's value.
Graph.prototype.addNode = function(node) {
  if (!this.contains(node)) {
    this.nodesAndEdges[node] = [];
  }
};

// Return a boolean value indicating if the value passed to contains is represented in the graph.
Graph.prototype.contains = function(node) {
  return this.nodesAndEdges.hasOwnProperty(node);
};

// Removes a node from the graph.
Graph.prototype.removeNode = function(node) {
  for (var i = 0; i < this.nodesAndEdges[node].length; i++) {
    this.removeDirectedEdge(this.nodesAndEdges[node][i], node);
  }
  delete this.nodesAndEdges[node];
};

// Returns a boolean indicating whether two specified nodes are connected.  Pass in the values contained in each of the two nodes.
Graph.prototype.hasEdge = function(fromNode, toNode) {
  return this.nodesAndEdges[fromNode].includes(toNode);
};

// Connects two nodes in a graph by adding an edge between them.
Graph.prototype.addEdge = function(fromNode, toNode) {
  this.nodesAndEdges[fromNode].push(toNode);
  this.nodesAndEdges[toNode].push(fromNode);
};

// Remove an edge between any two specified (by value) nodes.
Graph.prototype.removeEdge = function(fromNode, toNode) {
  this.removeDirectedEdge(fromNode, toNode);
  this.removeDirectedEdge(toNode, fromNode);
};

Graph.prototype.removeDirectedEdge = function(fromNode, toNode) {
  var index = this.nodesAndEdges[fromNode].indexOf(toNode);
  this.nodesAndEdges[fromNode].splice(index, 1);
};

// Pass in a callback which will be executed on each node of the graph.
Graph.prototype.forEachNode = function(cb) {
  for (var node in this.nodesAndEdges) {
    cb(node);
  }
};

/*
 * Complexity: What is the time complexity of the above functions?
 * addNode: constant - O(1)
 * contains: constant - O(1)
 * removeNode: linear - O(n) where n is the number of nodes
 * hasEdge: linear - O(n) where n is the number of nodes
 * addEdge: constant - O(1)
 * removeEdge: linear - O(n) where n is the number of nodes
 * forEachNode: linear - O(n) where n is the number of nodes
 */


