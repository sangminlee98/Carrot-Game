const startBtn = document.querySelector('.start');
const timer = document.querySelector('.timer');
const alertBox = document.querySelectorAll('.alert');
const lost = document.querySelector('.lost');
const replay = document.querySelector('.replay');
const won = document.querySelector('.won');
const restart = document.querySelectorAll('.restart');
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

const gameStart = () => {
    state = !state;
    if(state) {
        document.querySelector('.timer').innerHTML = '00:10';
        startTimer(); 
    } else {
        stopTimer();
        playSound(alertBgm);
        pauseSound(bgm);
        replay.style.display = 'block';
    }
    playImgToggle();
}

const startTimer = () => {
    playSound(bgm);
    lost.style.display = 'none';
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
        document.querySelector('.timer').innerHTML = `00:0${time}`;
        time--;
        if(time<0){
            startBtn.style.visibility = 'hidden';
            clearInterval(counting);
            playSound(alertBgm);
            pauseSound(bgm);
            document.querySelector('.timer').innerHTML = 'Time Over';
            playImgToggle();
            time = 9;
            lost.style.display = 'block';
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
    positionX = rand(0,fieldRect.width-80);
    positionY = rand(0,fieldRect.height-80);
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
            won.style.display = 'block';      
        }
    } else if(target.matches('.bug')) {
        playSound(bugSound);
        pauseSound(bgm);
        state = !state;
        stopTimer();
        lost.style.display = 'block';
        
    }
}

startBtn.addEventListener('click', gameStart);

restart.forEach(item => {
    item.addEventListener('click', () => {
        state = false;
        gameStart();
        alertBox.forEach(box => {
            box.style.display = 'none';
        })
    });
})

field.addEventListener('click', onFieldClick);