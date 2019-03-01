var images_1 = [
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

var images_2 = [
  { correct: "img/c-11.png",
    incorrect: "img/i-11.png",
    message: "List items do not expand"
  },
  { correct: "img/c-12.png",
    incorrect: "img/i-12.png",
    message: "Yellow is pending"
  },
  { correct: "img/c-13.png",
    incorrect: "img/i-13.png",
    message: "emphasize data"
  },
  { correct: "img/c-14.png",
    incorrect: "img/i-14.png",
    message: "default avatar"
  },
  { correct: "img/c-15.png",
    incorrect: "img/i-15.png",
    message: "blue is info"
  },
  { correct: "img/c-16.png",
    incorrect: "img/i-16.png",
    message: "grouping"
  },
  { correct: "img/c-17.png",
    incorrect: "img/i-17.png",
    message: "alignment"
  },
  { correct: "img/c-18.png",
    incorrect: "img/i-18.png",
    message: "no indentation"
  },
  { correct: "img/c-19.png",
    incorrect: "img/i-19.png",
    message: "selectable affordance"
  },
  { correct: "img/c-20.png",
    incorrect: "img/i-20.png",
    message: "flag is pending (yellow)"
  }
]

var images_3 = [
  { correct: "img/c-21.png",
    incorrect: "img/i-21.png",
    message: "List items do not expand"
  },
  { correct: "img/c-22.png",
    incorrect: "img/i-22.png",
    message: "Yellow is pending"
  },
  { correct: "img/c-23.png",
    incorrect: "img/i-23.png",
    message: "emphasize data"
  },
  { correct: "img/c-24.png",
    incorrect: "img/i-24.png",
    message: "default avatar"
  },
  { correct: "img/c-25.png",
    incorrect: "img/i-25.png",
    message: "blue is info"
  },
  { correct: "img/c-26.png",
    incorrect: "img/i-26.png",
    message: "grouping"
  },
  { correct: "img/c-27.png",
    incorrect: "img/i-27.png",
    message: "alignment"
  },
  { correct: "img/c-28.png",
    incorrect: "img/i-28.png",
    message: "no indentation"
  },
  { correct: "img/c-29.png",
    incorrect: "img/i-29.png",
    message: "selectable affordance"
  },
  { correct: "img/c-30.png",
    incorrect: "img/i-30.png",
    message: "flag is pending (yellow)"
  }
]


var score = 0;
var num = 0;
var current_level = 1;
var current_imgs = images_1;
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

pick_new_images(current_imgs);
random_position();

function pick_new_images(set){
  var random = Math.floor(Math.random()*count.length);
  index = count.splice(random,1)[0]; //Picks random number 1-10, no replace
  document.getElementById("c_img").src = set[index].correct;
  document.getElementById("i_img").src = set[index].incorrect;
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
  clicked = c_btn;
  not_clicked = i_btn;
  var msg = document.getElementById("message");
  msg.innerHTML = "<i class='fas fa-check-circle'></i> " + current_imgs[index].message;
  msg.classList.add("success");
  update_score();
  review();
}

async function update_score() {
  var increase_by = 200 + Math.floor(Math.random()*100);
  for (i = 0; i < increase_by; i++) {
    console.log(score);
    await sleep(5);
    score++;
    document.getElementById("scoredisplay").innerHTML = String("00000" + score).slice(-5);
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


function incorrect(){
  var msg = document.getElementById("message");
  clicked = i_btn;
  not_clicked = c_btn;
  msg.innerHTML = "<i class='far fa-times-circle'></i> " + current_imgs[index].message;
  msg.classList.add("wrong");
  review();
}

function review(){
  c_btn.onclick = "";
  i_btn.onclick = "";
  document.getElementById("review-btns").style.display = "block";
  not_clicked.style.transition = "width 0.2s ease-in-out";
  not_clicked.style.width = "0px";
  not_clicked.style.margin = "10px 0px";
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
  if (clicked.children[0].src.includes(current_imgs[index].incorrect)) {
  clicked.children[0].src = current_imgs[index].correct;
  }
  else {
  clicked.children[0].src = current_imgs[index].incorrect;
  }
}

function next_level(){
  var msg = document.getElementById("message");
  window.onkeydown = window.onkeyup = null;
  current_level++;

  if (current_level <= 10) {
    current_imgs = images_1;
    pick_new_images(current_imgs);
    document.getElementById("progress").style.width = String((current_level/10 * 100) + "%");
    document.getElementById("leveldisplay").innerHTML = "PASSIVE UX " + current_level + " / 10";
    msg.innerHTML = "SELECT THE BETTER DESIGN";
    random_position();
  }

  if (10 < current_level && current_level <= 20){
    if (count.length == 0) {
      for (i=0;i<10;i++) {
        count.push(i);
      }
    }
    current_imgs = images_2;
    pick_new_images(current_imgs);

    document.getElementById("progress").style.width = String(((current_level-10)/10 * 100) + "%");
    document.getElementById("leveldisplay").innerHTML = "DESIGN SYSTEM " + (current_level - 10) + " / 10";
    msg.innerHTML = "SELECT THE DESIGN MOST CONSISTENT WITH OUR STYLE";
    random_position();

  }

  if (current_level == 21) {
    game_over();
  }

  document.getElementById("review-btns").style.display = "none";
  msg.classList.remove("wrong");
  msg.classList.remove("success");
  clicked.style.border = "none";
  not_clicked.style.transition = "width 0s";
  not_clicked.style.width = "350px";
  not_clicked.style.margin = "10px";
  not_clicked.children[0].display = "block";
  c_btn.onclick = correct;
  i_btn.onclick = incorrect;
}

function game_over(){
  document.getElementById("game_view").style.display = "none";
  document.getElementById("end_view").style.display = "block";
  document.getElementById("final_score").innerHTML = score;
  document.getElementById("final_time").innerHTML = Math.floor(((Date.now() - start)/1000)/60) + " minutes " + Math.floor(((Date.now() - start)/1000)%60) + " seconds" ;
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
  document.getElementById("scoredisplay").innerHTML = "00000";
  document.getElementById("leveldisplay").innerHTML = "PASSIVE UX " + current_level + " / 10";
  document.getElementById("message").innerHTML = "SELECT THE BETTER DESIGN";
  pick_new_images(images_1);
  random_position();
}
