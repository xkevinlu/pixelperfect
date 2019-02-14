var images = [
  { correct: "img/c-1.png",
    incorrect: "img/i-1.png",
    message: "kerning"
  },
  { correct: "img/c-2.png",
    incorrect: "img/i-2.png",
    message: "button text alignment"
  },
  { correct: "img/c-3.png",
    incorrect: "img/i-3.png",
    message: "line spacing"
  },
  { correct: "img/c-4.png",
    incorrect: "img/i-4.png",
    message: "aspect ratio scaling"
  },
  { correct: "img/c-5.png",
    incorrect: "img/i-5.png",
    message: "arrow alignment"
  },
  { correct: "img/c-6.png",
    incorrect: "img/i-6.png",
    message: "text contrast"
  },
  { correct: "img/c-7.png",
    incorrect: "img/i-7.png",
    message: "filter indicator"
  },
  { correct: "img/c-8.png",
    incorrect: "img/i-8.png",
    message: "primary action"
  },
  { correct: "img/c-9.png",
    incorrect: "img/i-9.png",
    message: "representative area"
  },
  { correct: "img/c-10.png",
    incorrect: "img/i-10.png",
    message: "text contrast"
  }
]

var score = 0;
var num = 0;
var current_level = 1;
var start = Date.now();
var time_elapsed = 0;
var clicked;
var not_clicked;
var index = "";
var count = [];
for (i=0;i<10;i++) {
  count.push(i);
}

c_btn = document.getElementById("correct");
i_btn = document.getElementById("incorrect");
next_btn = document.getElementById("next");
again_btn = document.getElementById("play_again");
compare_btn = document.getElementById("compare");

c_btn.onclick = correct;
i_btn.onclick = incorrect;
next_btn.onclick =  next_level;
again_btn.onclick = play_again;
compare_btn.onmousedown = compare_btn.onmouseup = compare;

pick_new_images();
random_position();

function pick_new_images(){
  var random = Math.floor(Math.random()*count.length);
  index = count.splice(random,1)[0]; //Picks random number 1-10, no replace
  document.getElementById("c_img").src = images[index].correct;
  document.getElementById("i_img").src = images[index].incorrect;
}

function random_position(){
  num = Math.random();
  if (num >= 0.5) {
  document.getElementById("box").style.flexDirection = "row";
  }
  else {
  document.getElementById("box").style.flexDirection = "row-reverse";
  }
}

//User Pick Phase
function correct(){
  var msg = document.getElementById("message");
  score += 100;
  clicked = c_btn;
  not_clicked = i_btn;
  msg.innerHTML = "<i class='fas fa-check-circle'></i> " + images[index].message;
  msg.classList.add("success");
  review();
}

function incorrect(){
  var msg = document.getElementById("message");
  clicked = i_btn;
  not_clicked = c_btn;
  msg.innerHTML = "<i class='far fa-times-circle'></i> " + images[index].message;
  msg.classList.add("wrong");
  review();
}

function review(){
  document.getElementById("scoredisplay").innerHTML = score;
  c_btn.onclick = "";
  i_btn.onclick = "";
  document.getElementById("review-btns").style.display = "block";
  // clicked.style.border = "5px solid white";
  not_clicked.style.transition = "width 0.3s ease-in-out";
  not_clicked.style.width = "0px";
  not_clicked.children[0].display = "none";
  window.onkeydown = window.onkeyup = keypress;
}

function keypress(e){
  if (e.key == "Shift") {
    compare();
  }
  else if (e.key == "Enter" ) {
    next_level();
  }
}
function compare() {
  if (clicked.children[0].src.includes(images[index].incorrect)) {
  clicked.children[0].src = images[index].correct;
  }
  else {
  clicked.children[0].src = images[index].incorrect;
  }
}

function next_level(){
  var msg = document.getElementById("message");
  window.onkeydown = window.onkeyup = null;
  current_level++;
  document.getElementById("leveldisplay").innerHTML = current_level;
  document.getElementById("progress").style.width = String((current_level/10 * 100) + "%");
  document.getElementById("review-btns").style.display = "none";
  msg.innerHTML = "Select the better design practice";
  msg.classList.remove("wrong");
  msg.classList.remove("success");
  clicked.style.border = "none";
  not_clicked.style.transition = "width 0s";
  not_clicked.style.width = "350px";
  not_clicked.children[0].display = "block";
  c_btn.onclick = correct;
  i_btn.onclick = incorrect;

  if (current_level == 11) {
    game_over();
  }
  else {
   random_position();
   pick_new_images();
  }
}

function game_over(){
  document.getElementById("game_view").style.display = "none";
  document.getElementById("end_view").style.display = "block";
  document.getElementById("final_score").innerHTML = score;
  document.getElementById("final_time").innerHTML = (Date.now() - start)/1000 + " seconds." ;
}

function play_again(){
  score = 0;
  current_level = 1;
  document.getElementById("progress").style.width = String((current_level/10 * 100) + "%");
  start = Date.now();
  for (i=0;i<10;i++) {
  count.push(i);
  }
  document.getElementById("game_view").style.display = "block";
  document.getElementById("end_view").style.display = "none";
  document.getElementById("final_score").innerHTML = score;
  document.getElementById("leveldisplay").innerHTML = current_level;
  document.getElementById("message").innerHTML = "";
}
