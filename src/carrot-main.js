import Alert from './alert.js';
import Field from './field.js';
import * as sound from './sound.js';

const startBtn = document.querySelector('.start');
const timer = document.querySelector('.timer');
const carrots = document.querySelectorAll('.carrot');
const bugs = document.querySelectorAll('.bug');

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
        sound.playAlert();
        sound.pauseBgm();
        gameFinishBanner.replayShow();
    }
    playImgToggle();
}

const startTimer = () => {
    sound.playBgm();
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
            sound.playAlert();
            sound.pauseBgm();
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

const onItemClick = (item) => {
    if(!state) {
        return;
    }
    if(item === 'carrot') {
        state = !state;
        stopTimer();
        sound.pauseBgm();
        sound.playWin();
        gameFinishBanner.wonShow();     
    } 
    if(item === 'bug') {
        state = !state;
        sound.pauseBgm();
        stopTimer();
        gameFinishBanner.lostShow();   
    }
}
field.setClickListener(onItemClick);
startBtn.addEventListener('click', gameStart);
