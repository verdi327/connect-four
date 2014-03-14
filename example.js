var array = [
  [1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10],
  [11,12,13,14,15],
  [16,17,18,19,20],
  [21,22,23,24,25],
]

var upAndLeft = [];
var downAndRight = [];
var row = 1;
var column = 0;

do
  {
    try {valid = array[row][column];} catch (e) {valid = false}
    upAndLeft.unshift(valid);
    row -= 1
    column -= 1
  }
while(valid)

var row = 1 + 1;
var column = 0 + 1;

do
  {
    try {valid = array[row][column];} catch (e) {valid = false}
    downAndRight.push(valid);
    row += 1
    column += 1
  }
while(valid)

var r = upAndLeft.concat(downAndRight);
console.log(r);