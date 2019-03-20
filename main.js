class Level {
  constructor(name, question_count, images, helptext) {
    this.name = name;
    this.total_questions = question_count;
    this.images = images;
    this.helptext = helptext;
    this.current_question = 0;
    this.current_images = images[0];
    this.count = [];
  }

  make_bag_of_images() {
    for(let i=0; i < this.total_questions; i++) {
      this.count.push(i);
    }
  }

  pick_new_images() {
    let random = Math.floor(Math.random()*this.count.length);
    let index = this.count.splice(random,1)[0]; //Picks random number 1-10, no replace
    this.current_images = this.images[index];
    document.getElementById("c_img").src = this.current_images.correct;
    document.getElementById("i_img").src = this.current_images.incorrect;
    this.random_position();
  }

  random_position() {
    let num = Math.random();
    if (num >= 0.5) {
      document.getElementById("box").style.flexDirection = "row";
    }
    else {
      document.getElementById("box").style.flexDirection = "row-reverse";
    }
  }

  next_question() {
  let instruction = document.getElementById("instruction");
  instruction.innerHTML = levels[game.current_level].helptext;
  let msg = document.getElementById("message");
  msg.innerHTML = "";
  window.onkeydown = window.onkeyup = null;
  this.current_question++;

  if (this.current_question <= this.total_questions) {
    document.getElementById("progress").style.width = String((this.current_question/this.total_questions * 100) + "%");
    document.getElementById("leveldisplay").innerHTML = `${levels[game.current_level].name} ${this.current_question} / ${this.total_questions}`;
    this.pick_new_images();
  }
  else {
    game.game_over();
  }

  //Reset UI to choose from two
  document.getElementById("review-btns").style.display = "none";
  document.getElementById("instruction").style.display = "block";
  document.getElementById("message").style.display = "none";
  msg.classList.remove("wrong");
  msg.classList.remove("success");
  try {
  inputs.not_clicked.style.transition = "width 0s";
  inputs.not_clicked.style.width = "350px";
  inputs.not_clicked.style.margin = "10px";
  } catch {
  console.log("Initial load no reset")
  }
  c_btn.onclick = inputs.correct;
  i_btn.onclick = inputs.incorrect;
  }

}


const levels =  [
                new Level("Persona I - Active UX", images_3.length, images_3, "WHICH DESIGN BETTER SERVES THE PRACTITIONER OR POWER USER?"),
                new Level("Design System I", images_2.length, images_2, "WHICH DESIGN IS MORE CONSISTENT WITH OUR STYLE?"),
                new Level("Visual Design I", images_1.length, images_1, "SELECT THE BETTER DESIGN"),
              ]


const game = {
  current_level:0,
  total_levels:0,
  score:0,
  startTime: Date.now(),

  init() {
    //Creates level selector UIs per level
    for (let i=0; i<levels.length; i++) {
      levels[i].button = document.createElement("div");
      levels[i].button.innerHTML = levels[i].name;
      levels[i].button.classList.add("gametype");
      document.getElementById("level_select_view").appendChild(levels[i].button);

      levels[i].button.onclick = function(){
        location.href = "#";
        game.init_level(i)};
    }

  },
  main_menu_view() {
    document.getElementById("init_view").style.display = "flex";
    document.getElementById("game_view").style.display = "none";
    document.getElementById("end_view").style.display = "none";
  },
  init_level(n) {
    this.current_level = n;
    this.score = 0;
    document.getElementById("init_view").style.display = "none";
    document.getElementById("game_view").style.display = "block";
    document.getElementById("progress").style.width = String((levels[this.current_level].current_question/levels[this.current_level].total_questions * 100) + "%");
    document.getElementById("scoredisplay").innerHTML = "00000";
    document.getElementById("leveldisplay").innerHTML = `${levels[this.current_level].name} ${levels[this.current_level].current_question} / ${levels[this.current_level].total_questions}`;
    levels[n].current_question = 0;
    levels[n].make_bag_of_images();
    levels[n].next_question();
  },
  review(){
    c_btn.onclick = "";
    i_btn.onclick = "";
    document.getElementById("review-btns").style.display = "block";
    document.getElementById("instruction").style.display = "none";
    document.getElementById("message").style.display = "block";
    inputs.not_clicked.style.transition = "width 0.2s ease-in-out";
    inputs.not_clicked.style.width = "0px";
    inputs.not_clicked.style.margin = "10px 0px";
    window.onkeydown = window.onkeyup = inputs.keypress;
  },
  async update_score() {
    var increase_by = 200 + Math.floor(Math.random()*50);
    for (i = 0; i < increase_by; i++) {
      await this.counterDelay(5);
      this.score++;
      document.getElementById("scoredisplay").innerHTML = String("00000" + this.score).slice(-5);
    }
  },
  counterDelay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  },
  game_over() {
    document.getElementById("game_view").style.display = "none";
    document.getElementById("end_view").style.display = "block";
    document.getElementById("final_score").innerHTML = this.score;
    document.getElementById("final_time").innerHTML = Math.floor(((Date.now() - this.startTime)/1000)/60) + " minutes " + Math.floor(((Date.now() - this.startTime)/1000)%60) + " seconds" ;
  },
  play_again(){
    game.score = 0;
    game.startTime = Date.now();
    levels[game.current_level].current_question = 0;
    game.main_menu_view();
    }
}


const inputs = {
    clicked: null,
    not_clicked: null,
    init(){
      play_btn = document.getElementById("play_btn");
      level_select_btn = document.getElementById("level_select_btn");
      c_btn = document.getElementById("correct");
      i_btn = document.getElementById("incorrect");
      next_btn = document.getElementById("next");
      again_btn = document.getElementById("play_again");
      compare_btn = document.getElementById("compare");

      play_btn.addEventListener("click", function(){game.init_level(0)});
      level_select_btn.onclick = null;
      c_btn.onclick = inputs.correct;
      i_btn.onclick = inputs.incorrect;
      next_btn.onclick = function(){levels[game.current_level].next_question()};
      compare_btn.onmousedown = compare_btn.onmouseup = compare_btn.ontouchstart = compare_btn.ontouchend = inputs.compare;
      again_btn.onclick = game.play_again;
    },
    correct(){
      inputs.clicked = c_btn;
      inputs.not_clicked = i_btn;
      var msg = document.getElementById("message");
      msg.innerHTML = "<i class='fas fa-check-circle'></i> " + levels[game.current_level].current_images.message;
      msg.classList.add("success");
      game.update_score();
      game.review();
    },

    incorrect(){
      var msg = document.getElementById("message");
      inputs.clicked = i_btn;
      inputs.not_clicked = c_btn;
      msg.innerHTML = "<i class='far fa-times-circle'></i> " + levels[game.current_level].current_images.message;
      msg.classList.add("wrong");
      game.review();
    },

    compare() {
      if (inputs.clicked.children[0].src.includes(levels[game.current_level].current_images.incorrect)) {
      inputs.clicked.children[0].src = levels[game.current_level].current_images.correct;
      }
      else {
      inputs.clicked.children[0].src = levels[game.current_level].current_images.incorrect;
      }
    },

    keypress(e){
      if (e.key == "Shift") {
        inputs.compare();
      }
      else if (e.key == "Enter" ) {
        levels[game.current_level].next_question();
      }
    },
}


inputs.init();
game.init();
game.main_menu_view();
