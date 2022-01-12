import Field from './field.js';
import * as sound from './sound.js';

export const Reason = Object.freeze({
    pause: 'pause',
    lost: 'lost',
    won: 'won',
})
export default class Game {
    constructor() {
        this.startBtn = document.querySelector('.start');
        this.startBtn.addEventListener('click', () => this.start());
        this.timer = document.querySelector('.timer');
        this.carrots = document.querySelectorAll('.carrot');
        this.bugs = document.querySelectorAll('.bug');
        this.state = false;
        this.time = 9;
        this.counting;
        this.countCarrot = 10;
        this.field = new Field(this.countCarrot);
        this.field.setClickListener(this.onItemClick);
    }
    setGameStopListener(onGameStop) {
        this.onGameStop = onGameStop;
    }
    start() {
        this.state = !this.state;
        if(this.state) {
            this.timer.innerHTML = '00:10';
            this.startTimer();
        } else {
            this.stopTimer();
            sound.playAlert();
            sound.pauseBgm();
            this.state = false;
            this.onGameStop && this.onGameStop(Reason.pause);
        }
        this.playImgToggle();
    }
    startTimer() {
        sound.playBgm();
        this.startBtn.style.visibility = 'visible';
        this.carrots.forEach(carrot => {
            carrot.style.display = 'inline';
            this.field.randomPosition(carrot);
        });
        this.bugs.forEach(bug => {
            bug.style.display = 'inline';
            this.field.randomPosition(bug);
        })
        this.field.initCount();
        this.field.startCountText();
        this.state = true;
        this.counting = setInterval(() => {
            this.timer.innerHTML = `00:0${this.time}`;
            this.time--;
            if(this.time<0){
                this.state = !this.state;
                this.stopTimer();
                sound.playAlert();
                sound.pauseBgm();
                this.timer.innerHTML = 'Time Over';
                this.playImgToggle();
                this.onGameStop && this.onGameStop(Reason.lost);
            };
        },1000); 
    };
    stopTimer() {
        this.startBtn.style.visibility = 'hidden';
        clearInterval(this.counting);
        this.time = 9;
    };
    playImgToggle() { 
        if(this.state) {
            this.startBtn.innerHTML = `<i class="fas fa-stop fa-2x"></i>`;
        } else {
            this.startBtn.innerHTML = `<i class="fas fa-play fa-2x"></i>`;
        }
    };
    onItemClick = (item) => {
        if(!this.state) {
            return;
        }
        if(item === 'carrot') {
            this.state = !this.state;
            this.stopTimer();
            sound.pauseBgm();
            sound.playWin();
            this.onGameStop && this.onGameStop(Reason.won);    
        } 
        if(item === 'bug') {
            this.state = !this.state;
            sound.pauseBgm();
            this.stopTimer();
            this.onGameStop && this.onGameStop(Reason.lost);
        }
    }
}