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

  checkForWinner = function(lastMove) {
    checkHorizontal(lastMove);
  },

  checkHorizontal = function(lastMove) {
    var player = lastMove.player;
    var oldBoard = $scope.board;
    var row = $scope.board[lastMove.row];
    var slices = each_cons(row, 4);
    result = _.any(slices, function(slice){
      return (slice[0].filled && slice[0].player === player) &&
             (slice[1].filled && slice[1].player === player) &&
             (slice[2].filled && slice[2].player === player) &&
             (slice[3].filled && slice[3].player === player)
    });

    console.log(result);

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
  };

  // each_cons([1,2,3,4,5,6,7], 2); => [[1,2],[2,3],[3,4],[4,5],[5,6],[6,7]]

}