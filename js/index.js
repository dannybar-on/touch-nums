'use strict';

var gCells;
var gCellsLength;
var gCurrCell = 1;
var gStartTime;
var gInterval;

function init() {
  var elBoard = document.querySelector('.board');

  gCells = shuffle(createCells(16));
  gCellsLength = gCells.length;
  elBoard.innerHTML = renderBoard(Math.sqrt(gCells.length));
}

function renderBoard(cells) {
  var strHTML = '';
  var cell;

  for (var i = 0; i < cells; i++) {
    strHTML += '<tr>';
    for (var j = 0; j < cells; j++) {
      cell = gCells.pop();
      strHTML += `<td class="cell${cell}" onclick="cellClicked(${cell})">${cell}</td>`;
    }
    strHTML += '</tr>';
  }

  return strHTML;
}

function createCells(cells) {
  var rCells = [];

  for (var i = 1; i <= cells; i++) {
    rCells.push(i);
  }

  return rCells;
}

function cellClicked(cell) {
  if (gCurrCell === cell) {
    var elCell = document.querySelector(`.cell${cell}`);

    if (cell === 1) {
      gStartTime = Date.now();
      gInterval = setInterval(gameTimer, 100);
    }

    elCell.style.backgroundColor = 'lightsalmon';
    gCurrCell++;

    if (gCurrCell > gCellsLength) clearInterval(gInterval);
  }
}

function gameTimer() {
  var elapsedTime = Date.now() - gStartTime;
  var elTimer = document.querySelector('.timer');

  elTimer.innerHTML = (elapsedTime / 1000).toFixed(3);
}

function difficultyLevel(level) {
  var elBoard = document.querySelector('.board');
  var elTimer = document.querySelector('.timer');

  clearInterval(gInterval);
  elTimer.innerHTML = '';
  gCurrCell = 1;

  switch (level) {
    case 'easy':
      gCells = shuffle(createCells(16));
      gCellsLength = gCells.length;
      elBoard.innerHTML = renderBoard(Math.sqrt(gCells.length));
      break;
    case 'medium':
      gCells = shuffle(createCells(25));
      gCellsLength = gCells.length;
      elBoard.innerHTML = renderBoard(Math.sqrt(gCells.length));
      break;
    case 'hard':
      gCells = shuffle(createCells(36));
      gCellsLength = gCells.length;
      elBoard.innerHTML = renderBoard(Math.sqrt(gCells.length));
      break;
  }
}

function shuffle(cells) {
  var randIdx, keep;

  for (var i = cells.length - 1; i > 0; i--) {
    randIdx = getRandomInt(0, i + 1);
    keep = cells[i];
    cells[i] = cells[randIdx];
    cells[randIdx] = keep;
  }

  return cells;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
