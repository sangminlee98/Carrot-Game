import Alert from './alert.js';
import Field from './field.js';

const startBtn = document.querySelector('.start');
const timer = document.querySelector('.timer');
const carrots = document.querySelectorAll('.carrot');
const bugs = document.querySelectorAll('.bug');
const bgm = new Audio('carrot/sound/bg.mp3');
const alertBgm = new Audio('carrot/sound/alert.wav');
const winBgm = new Audio('carrot/sound/game_win.mp3');

let state = false;
let time = 9;
let counting;
let countCarrot = 10;
const gameFinishBanner = new Alert();
gameFinishBanner.setClickListener(() => {
    state = false;
    gameStart();
})
const field = new Field(countCarrot);

const gameStart = () => {
    state = !state;
    if(state) {
        timer.innerHTML = '00:10';
        startTimer(); 
    } else {
        stopTimer();
        playSound(alertBgm);
        pauseSound(bgm);
        gameFinishBanner.replayShow();
    }
    playImgToggle();
}

const startTimer = () => {
    playSound(bgm);
    startBtn.style.visibility = 'visible';
    carrots.forEach(carrot => {
        carrot.style.display = 'inline';
        field.randomPosition(carrot);
    });
    bugs.forEach(bug => {
        bug.style.display = 'inline';
        field.randomPosition(bug);
    })
    field.initCount();
    field.startCountText();
    state = true;
    counting = setInterval(() => {
        timer.innerHTML = `00:0${time}`;
        time--;
        if(time<0){
            state = !state;
            stopTimer();
            playSound(alertBgm);
            pauseSound(bgm);
            timer.innerHTML = 'Time Over';
            playImgToggle();
            gameFinishBanner.lostShow();
        };
    },1000); 
};
const stopTimer = () => {
    startBtn.style.visibility = 'hidden';
    clearInterval(counting);
    time = 9;
}

const playImgToggle = () => { 
    if(state) {
        startBtn.innerHTML = `<i class="fas fa-stop fa-2x"></i>`;
    } else {
        startBtn.innerHTML = `<i class="fas fa-play fa-2x"></i>`;
    }
}

const playSound = (sound) => {
    sound.currentTime = 0;
    sound.play();
}
const pauseSound = (sound) => {
    sound.pause();
}

const onItemClick = (item) => {
    if(!state) {
        return;
    }
    if(item === 'carrot') {
        state = !state;
        stopTimer();
        pauseSound(bgm);
        playSound(winBgm);
        gameFinishBanner.wonShow();     
    } 
    if(item === 'bug') {
        pauseSound(bgm);
        state = !state;
        stopTimer();
        gameFinishBanner.lostShow();   
    }
}
field.setClickListener(onItemClick);
startBtn.addEventListener('click', gameStart);
