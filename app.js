let player = 'X';
let gameOver = true;
let cels = {len: 0};
let score = {X: 0, O: 0};

$('#btn').click(() => {
  if(gameOver){
    gameOver = false;
    $('#btn').text('Game in Progress');
    $('.cel').text('');
    cels = {len: 0};
    displayPlayer();
  }
});

$('.cel').click(function() {
  if(!gameOver){
    id = $(this).attr("id");
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

const changePlayer = () => {
  player === 'X' ? player = 'O' : player = 'X';
}

const displayPlayer = () => {
  $('#msg').text('Player ' + player + ' turn!');
}

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

const win = (x, y, z) => {
  return (x && x === y && x === z) ? true : false;
}

const resetGame = () => {
  $('#btn').text('Another Round');
  $('#scores').text('X: ' + score.X + ' --- O: ' + score.O);
  changePlayer();
}