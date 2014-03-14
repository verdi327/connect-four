function ConnectFourController($scope) {
  $scope.board = [
    [{filled: false, user:"", player: 0, row: 0}, {filled: false, user:"", player: 0, row: 0}, {filled: false, user:"", player: 0, row: 0}, {filled: false, user:"", player: 0, row: 0}, {filled: false, user:"", player: 0, row: 0}, {filled: false, user:"", player: 0, row: 0}, {filled: false, user:"", player: 0, row: 0}],
    [{filled: false, user:"", player: 0, row: 1}, {filled: false, user:"", player: 0, row: 1}, {filled: false, user:"", player: 0, row: 1}, {filled: false, user:"", player: 0, row: 1}, {filled: false, user:"", player: 0, row: 1}, {filled: false, user:"", player: 0, row: 1}, {filled: false, user:"", player: 0, row: 1}],
    [{filled: false, user:"", player: 0, row: 2}, {filled: false, user:"", player: 0, row: 2}, {filled: false, user:"", player: 0, row: 2}, {filled: false, user:"", player: 0, row: 2}, {filled: false, user:"", player: 0, row: 2}, {filled: false, user:"", player: 0, row: 2}, {filled: false, user:"", player: 0, row: 2}],
    [{filled: false, user:"", player: 0, row: 3}, {filled: false, user:"", player: 0, row: 3}, {filled: false, user:"", player: 0, row: 3}, {filled: false, user:"", player: 0, row: 3}, {filled: false, user:"", player: 0, row: 3}, {filled: false, user:"", player: 0, row: 3}, {filled: false, user:"", player: 0, row: 3}],
    [{filled: false, user:"", player: 0, row: 4}, {filled: false, user:"", player: 0, row: 4}, {filled: false, user:"", player: 0, row: 4}, {filled: false, user:"", player: 0, row: 4}, {filled: false, user:"", player: 0, row: 4}, {filled: false, user:"", player: 0, row: 4}, {filled: false, user:"", player: 0, row: 4}],
    [{filled: false, user:"", player: 0, row: 5}, {filled: false, user:"", player: 0, row: 5}, {filled: false, user:"", player: 0, row: 5}, {filled: false, user:"", player: 0, row: 5}, {filled: false, user:"", player: 0, row: 5}, {filled: false, user:"", player: 0, row: 5}, {filled: false, user:"", player: 0, row: 5}]
  ];

  var moveNumber = 1;

  $scope.players = {
    player1: "",
    player2: ""
  };

  isEven = function(value) {
    return (value % 2 == 0);
  },

  determineUser = function() {
    if (isEven(moveNumber)){
      return {player: 2, name: $scope.players.player2};
    } else {
      return {player: 1, name: $scope.players.player1};
    }
  },

  $scope.addChip = function(column) {
    var user = determineUser();
    var unFilled = true;
    var lastMove = {};
    angular.forEach($scope.board.reverse(), function(row){
      if (!row[column].filled) {
        if (unFilled) {
          row[column].filled = true;
          row[column].user = user.name;
          row[column].player = user.player;
          unFilled = false;
          lastMove.row = row[column].row;
          lastMove.column = column;
          lastMove.user = user.name;
          lastMove.player = user.player;
        }
      }
    });
    $scope.board.reverse();
    checkForWinner(lastMove);
    moveNumber += 1
  },

  capitalize = function(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
  },

  checkForWinner = function(lastMove) {
    if ( checkHorizontal(lastMove) || checkVertical(lastMove) || checkRDiagonal(lastMove) || checkLDiagonal(lastMove)  ) {
      alert("Big Ups " + capitalize(lastMove.user) + " on the win");
      return true;
    }
  },

  checkHorizontal = function(lastMove) {
    var row = $scope.board[lastMove.row];
    var slices = each_cons(row, 4);
    return fourConnected(slices, lastMove.player);
  },

  checkVertical = function(lastMove) {
    var column = _.map($scope.board, function(row){
      return row[lastMove.column];
    });
    var slices = each_cons(column, 4);
    return fourConnected(slices, lastMove.player);
  },

  checkRDiagonal = function(lastMove) {
    var upAndRight = [];
    var downAndLeft = [];
    var row = lastMove.row;
    var column = lastMove.column;

    // move diagonally up and to the right from the origin including the origin
    do
      {
        try {valid = $scope.board[row][column];} catch (e) {valid = false}
        upAndRight.push(valid);
        row -= 1
        column += 1
      }
    while(valid)

    row = lastMove.row + 1;
    column = lastMove.column - 1;

    // move diagonally down and to the left not including the origin
    do
      {
        try {valid = $scope.board[row][column];} catch (e) {valid = false}
        downAndLeft.unshift(valid);
        row += 1
        column -= 1
      }
    while(valid)

    upAndRight = _.compact(upAndRight);
    downAndLeft = _.compact(downAndLeft);
    var results = downAndLeft.concat(upAndRight);

    var slices = each_cons(results, 4);
    return fourConnected(slices, lastMove.player);
  },

  checkLDiagonal = function(lastMove) {
    var upAndLeft = [];
    var downAndRight = [];
    var row = lastMove.row;
    var column = lastMove.column;

    // move diagonally up and to the left from the origin including the origin
    do
      {
        try {valid = $scope.board[row][column];} catch (e) {valid = false}
        upAndLeft.unshift(valid);
        row -= 1
        column -= 1
      }
    while(valid)

    row = lastMove.row + 1;
    column = lastMove.column + 1;

    // move diagonally down and to the right not including the origin
    do
      {
        try {valid = $scope.board[row][column];} catch (e) {valid = false}
        downAndRight.push(valid);
        row += 1
        column += 1
      }
    while(valid)

    upAndLeft = _.compact(upAndLeft);
    downAndRight = _.compact(downAndRight);
    var results = upAndLeft.concat(downAndRight);

    var slices = each_cons(results, 4);
    return fourConnected(slices, lastMove.player);
  },

  fourConnected = function(array, player){
    return _.any(array, function(subArray){
      return _.every(subArray, function(move){
        return (move.filled && move.player === player);
      });
    });
  },

  each_cons = function(array, length) {
    var slices = [];
    for (var i=0; i<array.length; i+=1) {
      var subArray = array.slice(i, i+length);
      if (subArray.length === 4) {
        slices.push(subArray);
      }
    }
    return slices;
  }

  // each_cons([1,2,3,4,5,6,7], 2); => [[1,2],[2,3],[3,4],[4,5],[5,6],[6,7]]

}