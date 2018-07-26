let player = 'O';
let gameInProgress = false;
let cels = new Array(9);
let movesPlayed = 0;
let score = {X: 0, O: 0};
let vsComputer = true;
let computerDifficult = 'hard';

//handle start/game in progres/another round button
$('#btn').click(function() {
  if(!gameInProgress){ //only do something if the game is not in progress
    gameInProgress = true;
    $('#btn').text('Game in Progress');
    $('button').removeClass('clickable');
    $('button').addClass('progress');
    $('.cel').text('');
    changePlayer();
  }
});

//handle the clicks on the cels
$('.cel').click(function() {
  if(gameInProgress){//only do something if the game is in progress
    let id = parseInt($(this).attr("id")[3]) - 1;
    if(!cels[id]){
      play(id);
    }
  }
});

//change players turn
const changePlayer = () => {
  if(gameInProgress){
    player === 'X' ? player = 'O' : player = 'X';
    $('#msg').text('Player ' + player + ' turn!');
  }
    if(player === 'O' && vsComputer && gameInProgress) {
      computerPlays();
    }
}

//verify all wining cases
const didWin = () => {
  if( win(cels[0], cels[1], cels[2]) ||
      win(cels[3], cels[4], cels[5]) ||
      win(cels[6], cels[7], cels[8]) ||
      win(cels[0], cels[3], cels[6]) ||
      win(cels[1], cels[4], cels[7]) ||
      win(cels[2], cels[5], cels[8]) ||
      win(cels[0], cels[4], cels[8]) ||
      win(cels[2], cels[4], cels[6])
  ){
    return true;
  }
  return false;
}

//verify if the 3 cels passed exist and are the same value
const win = (x, y, z) => {
  return (x && x === y && x === z) ? true : false;
}

//resets the board and updates the score msg;
const resetGame = () => {
  cels = new Array(9);
  movesPlayed = 0;
  $('#btn').text('Another Round');
  $('button').removeClass('progress');
  $('button').addClass('clickable');
  $('#scores').text('X: ' + score.X + ' vs O: ' + score.O);
}

//change PvC and PvP
$('.opt').click(function() {
  if(!gameInProgress) {
    $('.opt').removeClass('opt-selected');
    $(this).addClass('opt-selected');
    $(this).attr('id') === 'pvc' ? vsComputer = true : vsComputer = false;
    resetScore();
  }
});

//change Difficult
$('.difficult').click(function() {
  if(!gameInProgress) {
    computerDifficult = $(this).attr('id');
    $('.difficult').removeClass('opt-selected');
    $(this).addClass('opt-selected');
  }
});

//reset button
$('#reset-score').click(function() {
  if(!gameInProgress) resetScore();
})

//reset score
const resetScore = (change) => {
    score.X = 0;
    score.O = 0;
    player = 'X';
    $('.cel').text('');
    $('#msg').text('Click Below to Start');
    $('#scores').text('X: 0 vs O: 0');
    $('#btn').text('Start Game');
  }
  
  //function to handle a move/play on the board
  const play = (numCel) => {
    movesPlayed++;
    $('#cel' + (numCel+1)).text(player);
    cels[numCel] = player;
    gameInProgress = !didWin();
    if(!gameInProgress){
      $('#msg').text('Player ' + player + ' won the game!!!');
      score[player] += 1;
      resetGame();
    } else {
      if(movesPlayed === 9){
        gameInProgress = false;
        $('#msg').text('It is a Draw!!!');
        resetGame();
      } else {
        changePlayer();
      }
    }
  }

  //computer makes a move on the board
  const computerPlays = () => {
  switch(computerDifficult) {
    case 'easy':
      easyPlay();
      break;
    case 'normal':
      normalPlay();
      break;
    case 'hard':
      hardPlay();
      break;
    default:
      break;
  }
}

//Easy mode AI
const easyPlay = () => {
  let randomCel = Math.floor(9*Math.random());
  cels[randomCel] ? easyPlay() : play(randomCel);
}
 
//Normal mode AI
const normalPlay = () => {
  if(canWin('O') || canWin('X')){
    return;
  }
  easyPlay();
}

//Hard mode AI
const hardPlay = () => {
  switch(movesPlayed) {
    case 0:
      hard0();
      break;
    case 1:
      hard1();
      break;
    case 2:
      hard2();
      break;
    case 3:
      hard3();
      break;
    case 4:
      hard4();
      break;
    case 5:
      hard5();
      break;
    case 6:
      hard6();
      break;
    case 7:
      hard7();
      break;
    case 8:
      hard8();
      break;
    default:
      easyPlay();
      break;
  }
}

/* ================================================= */
//0, 2, 4, 6, 8 means the Computer started playing

const hard0 = () => {
  play(0);
}

const hard2 = () => {
  if(cels[4] === 'X'){
    play(8);
  } else if(cels[1] === 'X' || 
            cels[2] === 'X' ||
            cels[7] === 'X' ||
            cels[8] === 'X'){
              play(6);
  } else {
    play(2);
  }

}

const hard4 = () => {
  if(canWin('O') || canWin('X')) return;
  if(cels[8] === 'O'){
    if(cels[2] === 'X'){
      play(6);
    } else if (cels[6] === 'X'){
      play(2);
    }
  } else if(cels[6] === 'O'){
    if(cels[1] === 'X' || cels[2] === 'X'){
      play(8);
    } else {
      play(2);
    }
  } else {
    if(cels[5] === 'X'){
      play(6);
    } else {
      play(8);
    }
  }
}

const hard6 = () => {
  if(canWin('O') || canWin('X')) return;
}

const hard8 = () => {
  for(let i=0; i<cels.length; i++){
    if(!cels[i]){
      play(i);
      return;
    }
  }
}

/* ================================================= */
//1, 3, 4, 7 means the Player started playing

const hard1 = () => {
  if( cels[4] === 'X'){
    play(0);
  } else {
    play(4);
  }
}

const hard3 = () => {
  if(canWin('X')) return;
  if(cels[4] === 'X'){
    play(1);
  } else if(cels[0] === 'X'){//if player did NOT started in the center
    if(cels[7] === 'X'){
      play(3);
    } else {
      play(1);
    }
  } else if(cels[1] === 'X'){
    if(cels[8] === 'X'){
      play(2);
    } else {
      play(0);
    }
  } else if(cels[2] === 'X'){
    if(cels[7] === 'X'){
      play(3);
    } else {
      play(1);
    }
  } else if(cels[3] === 'X'){
    if(cels[7] === 'X'){
      play(6);
    } else {
      play(7);
    }
  } else if(cels[5] === 'X'){
    if(cels[6] === 'X'){
      play(7);
    } else {
      play(8);
    }
  }
}

const hard5 = () => {
  if(canWin('O') || canWin('X')) return;
  if(cels[4] === 'X' && cels[8] === 'X'){
    if(cels[1] === 'X'){
      play(6);
    } else if(cels[3] === 'X'){
      play(2);
    }
  } else if(cels[3] === 'O'){//if player did NOT started in the center
    play(2);
  } else if(cels[1] === 'O' && cels[3] === 'X'){
    play(8);
  } else if(!cels[3] && !cels[5]){
    play(5);
  } else if(!cels[0]){
    play(0);
  } else {
    play(6);
  }
}

const hard7 = () => {
  if(canWin('O') || canWin('X')) return;
  hard8();
}

/* ================================================= */

//verify if the computer can win the game
const canWin = (p) => {
  let willWin;
  for(let i=0; i<cels.length; i++){
    if(!cels[i]){
      cels[i] = p;
      willWin = didWin();
      cels[i] = undefined;
      if(willWin) {
        play(i);
        return true;
      }
    }
  }
  return false;
}