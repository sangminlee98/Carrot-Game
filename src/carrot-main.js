import Alert from './alert.js';

const startBtn = document.querySelector('.start');
const timer = document.querySelector('.timer');

const carrots = document.querySelectorAll('.carrot');
const bugs = document.querySelectorAll('.bug');
const count = document.querySelector('.count');
const field = document.querySelector('.play-field');
const fieldRect = field.getBoundingClientRect();

const bgm = new Audio('carrot/sound/bg.mp3');
const carrotSound = new Audio('carrot/sound/carrot_pull.mp3');
const bugSound = new Audio('carrot/sound/bug_pull.mp3');
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
        randomPosition(carrot);
    });
    bugs.forEach(bug => {
        bug.style.display = 'inline';
        randomPosition(bug);
    })
    countCarrot = 10;
    count.textContent = countCarrot;
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

const rand = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const randomPosition = (object) => {
    const positionX = rand(0,fieldRect.width-80);
    const positionY = rand(0,fieldRect.height-80);
    object.style.top = `${positionY}px`;
    object.style.left = `${positionX}px`;
}

const playSound = (sound) => {
    sound.currentTime = 0;
    sound.play();
}
const pauseSound = (sound) => {
    sound.pause();
}

const onFieldClick = (e) => {
    if(!state) {
        return;
    }
    const target = e.target;
    if(target.matches('.carrot')) {
        playSound(carrotSound);
        target.style.display = 'none';
        countCarrot--;
        count.textContent = countCarrot;
        if(countCarrot === 0) {
            state = !state;
            stopTimer();
            pauseSound(bgm);
            playSound(winBgm);
            gameFinishBanner.wonShow();     
        }
    } else if(target.matches('.bug')) {
        playSound(bugSound);
        pauseSound(bgm);
        state = !state;
        stopTimer();
        gameFinishBanner.lostShow();
        
    }
}

startBtn.addEventListener('click', gameStart);

field.addEventListener('click', onFieldClick);