'use strict';

// NOTE: This is a global used only in the controller
var gLastRes = null;



$(document).ready(function () {
  init();
  addEventListeners();
});

function addEventListeners() {
  $('.btn-start').click(onStartGuessing);
  $('.btn-yes').click({ ans: 'yes' }, onUserResponse);
  $('.btn-no').click({ ans: 'no' }, onUserResponse);
  $('.btn-add-guess').click(onAddGuess);
  $('.close').click(closeModal);
}
function init() {
  createQuestsTree();
}

function onStartGuessing() {
  // hide the game-start section
  var $elStartGame = $('.game-start');
  $elStartGame.hide('slow');
  renderQuest();
  // show the quest section
  var $elQuest = $('.quest');
  $elQuest.show('slow');
}

function renderQuest() {
  //select the <h2> inside quest and update
  // its text by the currQuest text
  var currQuest = getCurrQuest();
  var $elCurrQuestTxt = $('.quest h2');
  $elCurrQuestTxt.text(currQuest.txt)
}

function onUserResponse(ev) {
  var res = ev.data.ans; // 'yes' or'no'
  // If this node has no children
  if (isChildless(getCurrQuest())) {
    if (res === 'yes') {
      // alert('Yes, I knew it!');
      $('.modal').show('slow')
      $('.modal-body').text('Yes, I knew it!').css('color', 'green')
      animateRotate(360)
      // TODO: improve UX
    } else {
      // alert('I dont know...teach me!');
      // hide and show new-quest section
      $('.modal').show('slow');
      $('.modal-body').text('I dont know...teach me!').css('color', 'red');
      var $newQuest = $('.new-quest');
      $newQuest.hide()
      renderQuest();
      $newQuest.show() // show the form section

    }
  } else {
    // update the lastRes global var
    gLastRes = res;
    moveToNextQuest(res);
    renderQuest();
  }
}


function closeModal() {
  $('.modal').hide('slow')

}

function onAddGuess(ev) {
  ev.preventDefault();
  // Get the inputs' values
  var newGuess = $('#newGuess').val();
  var newQuest = $('#newQuest').val();
  //  Call the service addGuess
  addGuess(newQuest, newGuess, gLastRes.txt)
  onRestartGame();
}

function onRestartGame() {
  $('.new-quest').hide('slow');
  $('.game-start').show('fast');
  gLastRes = null;
  gCurrQuest = gQuestsTree;

}

function animateRotate(angle) {
  // caching the object for performance reasons
  var $elem = $('.jini');

  // we use a pseudo object for the animation
  // (starts from `0` to `angle`), you can name it as you want
  $({ deg: 0 }).animate({ deg: angle }, {
    duration: 2000,
    step: function (now) {
      // in the step-callback (that is fired each step of the animation),
      // you can use the `now` paramter which contains the current
      // animation-position (`0` up to `angle`)
      $elem.css({
        transform: 'rotate(' + now + 'deg)'
      });
    }
  });
}
