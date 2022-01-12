import Field from './field.js';
import * as sound from './sound.js';

export const Reason = Object.freeze({
    pause: 'pause',
    lost: 'lost',
    won: 'won',
})
export default class GameBuilder {
    setCarrotCount(num) {
        this.countCarrot = num;
        return this;
    };
    setBugCount(num) {
        this.countBug = num;
        return this;
    };
    setDuration(num) {
        this.duration = num;
        return this;
    };
    build() {
        return new Game(
            this.countCarrot,
            this.countBug,
            this.duration
        );
    }
}
class Game {
    constructor(countCarrot, countBug, duration) {
        this.state = false;
        this.time = duration;
        this.initTime = duration;
        this.counting;
        this.countCarrot = countCarrot;
        this.countBug = countBug;
        this.field = new Field(countCarrot, countBug);
        this.field.setClickListener(this.onItemClick);
        this.startBtn = document.querySelector('.start');
        this.startBtn.addEventListener('click', () => this.start());
        this.timer = document.querySelector('.timer');
        this.carrots = document.querySelectorAll('.carrot');
        this.bugs = document.querySelectorAll('.bug');
    }
    setGameStopListener(onGameStop) {
        this.onGameStop = onGameStop;
    };
    get getState() {
        return this.state;
    }
    start() {
        this.state = !this.state;
        this.field.state = true;
        if(this.state) {
            if(this.time>=10) {
                this.timer.textContent = `00:${this.time}`;
            } else {
                this.timer.innerHTML = `00:0${this.time}`;
            } 
            this.startTimer();
        } else {
            this.stopTimer();
            sound.playAlert();
            sound.pauseBgm();
            this.state = false;
            this.field.state = false;
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
            if(this.time-1>=10) {
                this.timer.innerHTML = `00:${this.time-1}`; 
            } else {
                this.timer.innerHTML = `00:0${this.time-1}`;
            }
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
        this.time = this.initTime;
    };
    playImgToggle() { 
        if(this.state) {
            this.startBtn.innerHTML = `<i class="fas fa-stop fa-2x"></i>`;
        } else {
            this.startBtn.innerHTML = `<i class="fas fa-play fa-2x"></i>`;
        }
    };
    onItemClick = (item) => {
        if(item === 'carrot') {
            this.state = !this.state;
            this.stopTimer();
            sound.pauseBgm();
            sound.playWin();
            this.onGameStop && this.onGameStop(Reason.won);
            this.field.state = false;    
        } 
        if(item === 'bug') {
            this.state = !this.state;
            sound.pauseBgm();
            this.stopTimer();
            this.onGameStop && this.onGameStop(Reason.lost);
            this.field.state = false;
        }
    }
}