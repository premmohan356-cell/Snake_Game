let moveobj = { x: 0, y: 0 };
let playSound = new Audio("music/music.mp3");
playSound.muted = true;
let moveSound = new Audio("music/move.mp3");
moveSound.muted = true;

let gameoverSound = new Audio("music/gameover.mp3");
gameoverSound.muted = true;

let foodSound = new Audio("music/food.mp3");
foodSound.muted = true;
let lasttime = 0;
let speed = 12;
let score = 0;
let highscore = 0;
if (localStorage.getItem("highscore")) {
  highscore = localStorage.getItem("highscore");
}

let snake = [
  { x: 2, y: 11 },
  { x: 2, y: 12 },
  { x: 2, y: 13 },
  { x: 2, y: 14 },
];

let food = { x: 3, y: 10 };
let Borad = document.querySelector("#board");
// Main function.........................
function main(ctime) {
  requestAnimationFrame(main);
  if (ctime - lasttime < 1000 / speed) {
    return;
  }
  lasttime = ctime;
  game();
}

function isCollide(snake) {
  for ([index, obj] of snake.entries()) {
    if (obj.x > 20 || obj.y < 1 || obj.x < 1 || obj.y > 20) {
      return true;
    }
    let head = snake[snake.length - 1];
    if (obj.x == head.x && obj.y == head.y && index != snake.length - 1) {
      return true;
    }
  }
  return false;
}
function game() {
  for ([index, obj] of snake.entries()) {
    let headindex = snake.length - 1;
    if (index === headindex) {
      snake[index].x += moveobj.x;
      snake[index].y += moveobj.y;
    } else if (moveobj.x || moveobj.y) {
      snake[index].x = snake[index + 1].x;
      snake[index].y = snake[index + 1].y;
    }
  }
  if (isCollide(snake)) {
    moveobj = { x: 0, y: 0 };
    playSound.pause();
    gameoverSound.play();
    alert("Game Over");
    playSound.play();
    snake = [{ x: 12, y: 13 }];
    score = 0;
  }
  // food ............................
  if (
    snake[snake.length - 1].x == food.x &&
    snake[snake.length - 1].y == food.y
  ) {
    snake.push({ x: food.x, y: food.y });
    score++;
    foodSound.play();
    if (score > highscore) {
      highscore++;
    }
    function Random() {
      let a = 1;
      let b = 21;
      let randomX = Math.trunc(a + (b - a) * Math.random());
      let randomY = Math.trunc(a + (b - a) * Math.random());
      // alert(randomX, randomY);
      for ([index, obj] of snake.entries()) {
        if (obj.x == randomX && obj.y == randomY) {
          Random();
          // alert("Some Thing has Matched");
          return;
        }
      }
      food.x = randomX;
      food.y = randomY;
      // console.log(food);
    }
    Random();
  }
  // Display the Snake..............................................
  Borad.innerHTML = "";
  for ([index, obj] of snake.entries()) {
    let headindex = snake.length - 1;
    if (headindex === index) {
      let head = document.createElement("DIV");
      Borad.appendChild(head);
      head.classList.add("SnakeCSS");
      head.style.gridColumnStart = obj.x % 21;
      head.style.gridRowStart = obj.y % 21;
    } else {
      let Bodypart = document.createElement("DIV");
      Borad.appendChild(Bodypart);
      Bodypart.classList.add("bodyCSS");
      Bodypart.style.gridColumnStart = obj.x % 21;
      Bodypart.style.gridRowStart = obj.y % 21;
    }
  }
  // Display The Food.......................
  let Snakefood = document.createElement("DIV");
  Snakefood.classList.add("FoodCSS");
  Borad.appendChild(Snakefood);
  Snakefood.style.gridColumnStart = food.x;
  Snakefood.style.gridRowStart = food.y;
  // Display Score...........................
  let score_arr = document.querySelectorAll("SPAN");
  score_arr[0].innerHTML = `Score:${score}`;
  // console.log(score_arr);
  // console.log(score, highscore);

  // alert(score_arr[1]);
  score_arr[1].innerHTML = `HighScore:${highscore}`;
  localStorage.setItem("highscore", highscore);
  // console.log(score_arr);
}

//Main Login..............................................
playSound.play();
document.onkeydown = function (event) {
  switch (event.code) {
    case "ArrowRight":
      moveobj.x = 1;
      moveobj.y = 0;
      event.preventDefault();
      moveSound.play();

      break;
    case "ArrowLeft":
      moveobj.x = -1;
      moveobj.y = 0;
      event.preventDefault();
      moveSound.play();

      break;
    case "ArrowUp":
      moveobj.x = 0;
      moveobj.y = -1;
      event.preventDefault();
      moveSound.play();

      break;
    case "ArrowDown":
      moveobj.x = 0;
      moveobj.y = 1;
      event.preventDefault();
      moveSound.play();

    default:
      break;
  }
};
requestAnimationFrame(main);
// Mute Button Work...................................
let mutekey = true;
let muteBtn = document.querySelector(".mutebox i");
muteBtn.addEventListener("click", function () {
  if (mutekey) {
    mutekey = false;
    playSound.play();
    this.className = "fa fa-volume-up";
    playSound.muted = false;
    gameoverSound.muted = false;
    foodSound.muted = false;
    moveSound.muted = false;
  } else {
    this.className = "fa fa-volume-xmark";
    mutekey = true;
    playSound.muted = true;
    gameoverSound.muted = true;
    foodSound.muted = true;
    moveSound.muted = true;
  }
});
// onscreen controler............................
let controllers = document.querySelectorAll("#controlbox i");
controllers.forEach((n, index) => {
  n.addEventListener("pointerdown", function () {
    switch (index) {
      case 0:
        moveobj.x = 0;
        moveobj.y = -1;
        moveSound.play();

        break;
      case 1:
        moveobj.x = 0;
        moveobj.y = 1;
        // event.preventDefault();
        moveSound.play();

        break;
      case 2:
        moveobj.x = 1;
        moveobj.y = 0;
        // event.preventDefault();
        moveSound.play();

        break;
      case 3:
        moveobj.x = -1;
        moveobj.y = 0;
        // event.preventDefault();
        moveSound.play();

      default:
        break;
    }
  });
});
