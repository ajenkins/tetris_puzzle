var _ = require('lodash/core');

var Board = function(width, height) {
  this.width = width;
  this.height = height;
  this.createArray = function() {
    if (this.array) {
      return this.array;
    } else {
      var arr = [];
      for (var j = 0; j < this.height; j++) {
        arr[j] = [];
        for (var i = 0; i < this.width; i++) {
          arr[j][i] = '_';
        }
      }
      this.array = arr
      return arr;
    }
  };
  this.stringify = function() {
    arr = this.array;
    strArray = [];
    for (var i = 0; i < arr.length; i++) {
      strArray.push(arr[i].join(' '));
    }
    return strArray.join('\n');
  }
};

var Tetromino = function(orientations) {
  this.orientations = orientations;
};

var Orientation = function(width, height, spots) {
  this.width = width;
  this.height = height;
  this.spots = spots;
};

// Square
var square1 = new Orientation(2, 2,
  [[0, 0], [0, 1], [1, 0], [1, 1]]);

var squareShape = new Tetromino([square1]);

// Line
var straight1 = new Orientation(1, 4,
  [[0, 0], [0, 1], [0, 2], [0, 3]]);

var straight2 = new Orientation(4, 1,
  [[0, 0], [1, 0], [2, 0], [3, 0]]);

var straightShape = new Tetromino([straight1, straight2]);

// S
var s1 = new Orientation(3, 2,
  [[1, 0], [2, 0], [0, 1], [1, 1]]);

var s2 = new Orientation(2, 3,
  [[0, 0], [0, 1], [1, 1], [1, 2]]);

var sShape = new Tetromino([s1, s2]);

// Z
var z1 = new Orientation(3, 2,
  [[0, 0], [1, 0], [1, 1], [2, 1]]);

var z2 = new Orientation(2, 3,
  [[1, 0], [0, 1], [1, 1], [0, 2]]);

var zShape = new Tetromino([z1, z2]);

// T
var t1 = new Orientation(3, 2,
  [[0, 0], [1, 0], [2, 0], [1, 1]]);

var t2 = new Orientation(2, 3,
  [[1, 0], [0, 1], [1, 1], [1, 2]]);

var t3 = new Orientation(3, 2,
  [[1, 0], [0, 1], [1, 1], [2, 1]]);

var t4 = new Orientation(2, 3,
  [[0, 0], [0, 1], [1, 1], [0, 2]]);

var tShape = new Tetromino([t1, t2, t3, t4]);

// L
var el1 = new Orientation(2, 3,
  [[0, 0], [0, 1], [0, 2], [1, 2]]);

var el2 = new Orientation(3, 2,
  [[0, 0], [1, 0], [2, 0], [0, 1]]);

var el3 = new Orientation(2, 3,
  [[0, 0], [1, 0], [1, 1], [1, 2]]);

var el4 = new Orientation(3, 2,
  [[2, 0], [0, 1], [1, 1], [2, 1]]);

var elShape = new Tetromino([el1, el2, el3, el4]);

// J
var j1 = new Orientation(2, 3,
  [[1, 0], [1, 1], [0, 2], [1, 2]]);

var j2 = new Orientation(3, 2,
  [[0, 0], [0, 1], [1, 1], [2, 1]]);

var j3 = new Orientation(2, 3,
  [[0, 0], [1, 0], [0, 1], [0, 2]]);

var j4 = new Orientation(3, 2,
  [[0, 0], [1, 0], [2, 0], [2, 1]]);

var jShape = new Tetromino([j1, j2, j3, j4]);

var allShapes = [squareShape, straightShape, sShape, zShape,
  tShape, elShape, jShape];

// End of setup code
// -----------------

var printBlock = function(block) {
  b = new Board(block.width, block.height);
  b.createArray();
  for (var m = 0; m < block.spots.length; m++) {
    var spot = block.spots[m];
    var i = spot[1];
    var j = spot[0];
    b.array[i][j] = 'O';
  }
  return b.toString();
};

// var curShape = jShape;
// for (var i = 0; i < curShape.orientations.length; i++) {
//   console.log(printBlock(curShape.orientations[i]));
//   console.log('\n');
// }

var deepClone = function(obj) {
  return JSON.parse(JSON.stringify(obj));
};

var shapeFitsAt = function(board, shape, position) {
  var i = position[0];
  var j = position[1];
  for (var s = 0; s < shape.spots.length; s++) {
    var spot = shape.spots[s];
    var x = spot[0];
    var y = spot[1];
    if (!board.array[j + x] || board.array[j + x][i + y] != '_') {
      return false;
    }
  }
  return true;
};

var insertShape = function(board, shape, position, char) {
  for (var i = 0; i < shape.spots.length; i++) {
    var x = shape.spots[i][0];
    var y = shape.spots[i][1];
    board.array[position[1] + x][position[0] + y] = char
  }
  // console.log(board.stringify());
  // console.log('\n');
  return board;
};

var nextChar = function(c) {
    return String.fromCharCode(c.charCodeAt(0) + 1);
};

function solvedPuzzle(board, shapes, char) {
  if (shapes.length == 0) {
    return board;
  }
  var origBoard = _.clone(board)
  origBoard.array = deepClone(board.array);
  var curShape = shapes[0];
  var otherShapes = shapes.slice(1);
  var orientations = curShape.orientations;
  for (var o = 0; o < orientations.length; o++) {
    for (var j = 0; j < board.height; j++) {
      for (var i = 0; i < board.width; i++) {
        var position = [i, j];
        if (shapeFitsAt(origBoard, orientations[o], position)) {
          var newBoard = _.clone(origBoard)
          newBoard.array = deepClone(origBoard.array);
          newBoard = insertShape(newBoard, orientations[o], position, char);
          var nextPuzzle = solvedPuzzle(newBoard, otherShapes, nextChar(char));
          if (nextPuzzle) {
            return nextPuzzle;
          }
        }
      }
    }
  }
  return false;
}

// Testing code starts here
// ------------------------

b = new Board(8, 5);
b.createArray();
var solved = solvedPuzzle(b, [tShape, tShape, jShape, elShape, squareShape, squareShape, straightShape, straightShape, zShape, sShape], 'A');
if (solved) {
  console.log('Solution:\n');
  console.log(solved.stringify());
} else {
  console.log('Puzzle could not be solved.');
}
