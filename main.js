var images = [
  { correct: "https://d0od-wpengine.netdna-ssl.com/wp-content/uploads/2016/10/0ecff498c2c0fb05ee659508afa154ac-350x200.gif",
    incorrect: "http://d3d86zle58b9ct.cloudfront.net/wp-content/uploads/sites/2/2018/05/Amazon-Echo-Alexa-350x200.jpg"},
  { correct: "https://d0od-wpengine.netdna-ssl.com/wp-content/uploads/2016/10/0ecff498c2c0fb05ee659508afa154ac-350x200.gif",
    incorrect: "http://d3d86zle58b9ct.cloudfront.net/wp-content/uploads/sites/2/2018/05/Amazon-Echo-Alexa-350x200.jpg"},
  { correct: "https://d0od-wpengine.netdna-ssl.com/wp-content/uploads/2016/10/0ecff498c2c0fb05ee659508afa154ac-350x200.gif",
    incorrect: "http://d3d86zle58b9ct.cloudfront.net/wp-content/uploads/sites/2/2018/05/Amazon-Echo-Alexa-350x200.jpg"},
  { correct: "https://d0od-wpengine.netdna-ssl.com/wp-content/uploads/2016/10/0ecff498c2c0fb05ee659508afa154ac-350x200.gif",
    incorrect: "http://d3d86zle58b9ct.cloudfront.net/wp-content/uploads/sites/2/2018/05/Amazon-Echo-Alexa-350x200.jpg"},
  { correct: "https://d0od-wpengine.netdna-ssl.com/wp-content/uploads/2016/10/0ecff498c2c0fb05ee659508afa154ac-350x200.gif",
    incorrect: "http://d3d86zle58b9ct.cloudfront.net/wp-content/uploads/sites/2/2018/05/Amazon-Echo-Alexa-350x200.jpg"},
  { correct: "https://d0od-wpengine.netdna-ssl.com/wp-content/uploads/2016/10/0ecff498c2c0fb05ee659508afa154ac-350x200.gif",
    incorrect: "http://d3d86zle58b9ct.cloudfront.net/wp-content/uploads/sites/2/2018/05/Amazon-Echo-Alexa-350x200.jpg"},
  { correct: "https://d0od-wpengine.netdna-ssl.com/wp-content/uploads/2016/10/0ecff498c2c0fb05ee659508afa154ac-350x200.gif",
    incorrect: "http://d3d86zle58b9ct.cloudfront.net/wp-content/uploads/sites/2/2018/05/Amazon-Echo-Alexa-350x200.jpg"},
  { correct: "https://d0od-wpengine.netdna-ssl.com/wp-content/uploads/2016/10/0ecff498c2c0fb05ee659508afa154ac-350x200.gif",
    incorrect: "http://d3d86zle58b9ct.cloudfront.net/wp-content/uploads/sites/2/2018/05/Amazon-Echo-Alexa-350x200.jpg"},
  { correct: "https://d0od-wpengine.netdna-ssl.com/wp-content/uploads/2016/10/0ecff498c2c0fb05ee659508afa154ac-350x200.gif",
    incorrect: "http://d3d86zle58b9ct.cloudfront.net/wp-content/uploads/sites/2/2018/05/Amazon-Echo-Alexa-350x200.jpg"},
  { correct: "https://d0od-wpengine.netdna-ssl.com/wp-content/uploads/2016/10/0ecff498c2c0fb05ee659508afa154ac-350x200.gif",
    incorrect: "http://d3d86zle58b9ct.cloudfront.net/wp-content/uploads/sites/2/2018/05/Amazon-Echo-Alexa-350x200.jpg"}
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
  score += 100;
  clicked = c_btn;
  not_clicked = i_btn;
  document.getElementById("message").innerHTML = "You got it!";
  review();
}

function incorrect(){
  clicked = i_btn;
  not_clicked = c_btn;
  document.getElementById("message").innerHTML = "Sorry, try again.";
  review();
}

function review(){
  document.getElementById("scoredisplay").innerHTML = score;
  c_btn.onclick = "";
  i_btn.onclick = "";
  document.getElementById("review-btns").style.display = "block";
  clicked.style.border = "5px solid white";
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
    window.onkeydown = window.onkeyup = "";
    next_level();
  } 
}
function compare() {
  if (clicked.children[0].src == images[index].incorrect) {
  clicked.children[0].src = images[index].correct;
  }
  else {
  clicked.children[0].src = images[index].incorrect;
  }
}

function next_level(){
  current_level++;
  document.getElementById("leveldisplay").innerHTML = current_level;
  document.getElementById("progress").style.width = String((current_level/10 * 100) + "%");
  document.getElementById("review-btns").style.display = "none";
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
    c_btn.style.border = "none";
  document.getElementById("message").innerHTML = "";
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
