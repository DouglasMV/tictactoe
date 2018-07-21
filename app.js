let player = 'X';
let gameOver = true;
let cels = {len: 0};
let score = {X: 0, O: 0};
let vsComputer = true;
let diff = 'easy';

//handle start/game in progres/another round button
$('#btn').click(function() {
  if(gameOver){ //only do something if the game is not in progress
    gameOver = false;
    $('#btn').text('Game in Progress');
    $('button').removeClass('clickable');
    $('button').addClass('progress');
    $('.cel').text('');
    cels = {len: 0};
    displayPlayer();
  }
});

//handle the clicks on the cels
$('.cel').click(function() {
  if(!gameOver){//only do something if the game is in progress
    let id = $(this).attr("id");
    if(!cels[id]){
      cels.len++;
      $(this).text(player);
      cels[id] = player;
      gameOver = didWin();
      if(gameOver){
        $('#msg').text('Player ' + player + ' won the game!!!');
        score[player] += 1;
        resetGame();
      } else {
        if(cels.len === 9){
          gameOver = true;
          $('#msg').text('It is a Draw!!!');
          resetGame();
        } else {
          changePlayer();
          displayPlayer();
        }
      }
    }
  }
});

//change players turn
const changePlayer = () => {
  player === 'X' ? player = 'O' : player = 'X';
}

//change the display msg to show the current player
const displayPlayer = () => {
  $('#msg').text('Player ' + player + ' turn!');
  if(player === 'O' && vsComputer) {
    computerPlays();
  }
}

//verify all wining cases
const didWin = () => {
  if( win(cels.cel1, cels.cel2, cels.cel3) ||
      win(cels.cel4, cels.cel5, cels.cel6) ||
      win(cels.cel7, cels.cel8, cels.cel9) ||
      win(cels.cel1, cels.cel4, cels.cel7) ||
      win(cels.cel2, cels.cel5, cels.cel8) ||
      win(cels.cel3, cels.cel6, cels.cel9) ||
      win(cels.cel1, cels.cel5, cels.cel9) ||
      win(cels.cel3, cels.cel5, cels.cel7)
  ){
    return true;
  }
  return false;
}

//return true if a player won
const win = (x, y, z) => {
  return (x && x === y && x === z) ? true : false;
}

//resets the board and updates the score msg;
const resetGame = () => {
  $('#btn').text('Another Round');
  $('button').removeClass('progress');
  $('button').addClass('clickable');
  $('#scores').text('X: ' + score.X + ' vs O: ' + score.O);
  changePlayer();
}

//change PvC and PvP
$('.opt').click(function() {
  if(!gameOver) {
    return;
  }
  $('.opt').removeClass('opt-selected');
  $(this).addClass('opt-selected');
  resetScore(true);
  $(this).attr('id') === 'pvc' ? vsComputer = true : vsComputer = false;
});

//change Difficult
$('.difficult').click(function() {
  if(!gameOver) {
    return;
  }
  diff = $(this).attr('id');
  $('.difficult').removeClass('opt-selected');
  $(this).addClass('opt-selected');
});

//reset button
$('#reset-score').click(function() {
  resetScore(false);
})

//reset score
const resetScore = (change) => {
  if(change || window.confirm("Are you sure you want to reset the score?")){
    score.X = 0;
    score.O = 0;
    $('#scores').text('X: ' + score.X + ' --- O: ' + score.O);
    player = 'X';
    $('.cel').text('');
    $('#btn').text('Start Game');
    $('#msg').text('Click Below to Start');
  }
}

//computer makes a move on the board
const computerPlays = () => {

}