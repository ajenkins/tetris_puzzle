var Board = function(width, height) {
  this.width = width;
  this.height = height;
  this.createArray = function() {
    if (this.array) {
      return this.array;
    } else {
      var arr = [];
      for (var i = 0; i < this.height; i++) {
        arr[i] = [];
        for (var j = 0; j < this.width; j++) {
          arr[i][j] = '_';
        }
      }
      this.array = arr
      return arr;
    }
  };
  this.boardString = function() {
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
  return b.boardString();
};

// var curShape = jShape;
// for (var i = 0; i < curShape.orientations.length; i++) {
//   console.log(printBlock(curShape.orientations[i]));
//   console.log('\n');
// }

var shapeFitsAt = function(board, shape) {

};

var insertShape = function(board, shape, position, char) {

};

var nextChar = function(c) {
    return String.fromCharCode(c.charCodeAt(0) + 1);
};

function solvedPuzzle(board, shapes, char) {
  if (shapes.length == 0) {
    return board;
  }
  curShape = shapes[0];
  otherShapes = shapes.slice(1);
  orientations = curShape.orientations;
  for (var o = 0; o < orientations.length; o++) {
    fitsAt = shapeFitsAt(board, o);
    if (fitsAt) {
      insertShape(board, o, fitsAt, char);
      var nextPuzzle = solvedPuzzle(board, otherShapes, nextChar(c));
      if (nextPuzzle) {
        return nextPuzzle;
      }
    }
  }
  return false;
}
