let sentences = [
  "ten ate neite ate nee enet ite ate inet ent eate",
  "Too ato too nOt enot one totA not anot tOO aNot",
  "oat itain oat tain nate eate tea anne inant nean",
  "itant eate anot eat nato inate eat anot tain eat",
  "nee ene ate ite tent tiet ent ine ene ete ene ate",
];

$(document).keydown(function (e) {
  if (e.which == 16) {
    $("#keyboard-lower-container").toggle();
    $("#keyboard-upper-container").toggle();
  }
});

$(document).keyup(function (e) {
  if (e.which == 16) {
    $("#keyboard-lower-container").toggle();
    $("#keyboard-upper-container").toggle();
  }
  if (e.which == e.keyCode) {
    $(".key").removeClass("yellow");
  }
});
let nudge = 34;
let keyPressCount = 0;
let count = 0;
let startTime = null;
let endTime = null;
let numberOfMistakes = 0;
let numberOfWords = 54;

if (sentences[count].charAt(0)) {
  $("#target-letter").html("<h1>" + sentences[count].charAt(0) + "</h1>");
}

$(document).keypress(function (e) {
  if (startTime === null) {
    start();
  }

  if (count === 5) {
    if (endTime === null) {
      end();
    }
    setTimeout(function () {
      $("#feedback").html(
        "<button id='gameReset' onclick='gameReset()'>Play Again?</button>"
      );
    }, 3000);
    return;
  }

  $("#target-letter").html(
    "<h1>" + sentences[count].charAt(keyPressCount + 1) + "</h1>"
  );

  if (e.key === sentences[count].charAt(keyPressCount)) {
    $("#feedback").append('<span class="glyphicon glyphicon-ok"></span>');
  } else {
    $("#feedback").append('<span class="glyphicon glyphicon-remove"></span>');
    numberOfMistakes++;
  }
  keyPressCount++; 

  if (keyPressCount === sentences[count].length) {
    count++;
    keyPressCount = 0;
    nudge = 16;
    $("#feedback").empty();
    $("#sentence").html(sentences[count]);
  }
  if (e.which == e.keyCode) {
    $("#" + e.keyCode).toggleClass("yellow");

    $("#yellow-block").css({
      left: nudge,
    });

    nudge += 17;
  }
});

function start() {
  startTime = new Date();
}

function end() {
  endTime = new Date();
  var timeDiff = endTime - startTime; 

  timeDiff /= 1000;


  var seconds = Math.round(timeDiff);
  let newMinutes = seconds / 60;
  let wordsPerMinute = Math.round(
    numberOfWords / newMinutes - 2 * numberOfMistakes
  );
  $("#target-letter").html("<p> Words Per Minute: " + wordsPerMinute + "</p>");
}

function gameReset() {
  document.location.reload();
}

$("#sentence").html(sentences[count]);
