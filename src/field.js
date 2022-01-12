import * as sound from './sound.js';

export default class Field {
    constructor(countCarrot,countBug) {
        this.countCarrot = countCarrot;
        this.initCountCarrot = countCarrot;
        this.countBug = countBug;
        this.count = document.querySelector('.count');
        this.field = document.querySelector('.play-field');
        this.createObject(countCarrot,countBug);
        this.fieldRect = this.field.getBoundingClientRect();
        this.field.addEventListener('click', (event) => this.onClick(event));
        this.state = true;
    };
    setClickListener(onItemClick) {
        this.onItemClick = onItemClick;
    }
    createObject(countCarrot,countBug) {
        for(let i=0; i<countCarrot; i++) {
            const item = document.createElement('img');
            item.setAttribute('class','carrot');
            item.setAttribute('src','../carrot/img/carrot.png');
            this.field.appendChild(item);
        };
        for(let i=0; i<countBug; i++) {
            const item = document.createElement('img');
            item.setAttribute('class','bug');
            item.setAttribute('src','../carrot/img/bug.png');
            this.field.appendChild(item);
        }
    }
    randomPosition(object) {
        const positionX = rand(0,this.fieldRect.width-80);
        const positionY = rand(0,this.fieldRect.height-80);
        object.style.top = `${positionY}px`;
        object.style.left = `${positionX}px`;
    }
    onClick(e) {
        if(!this.state) {
            return;
        }
        const target = e.target;
        if(target.matches('.carrot')) {
            sound.playCarrot();
            target.style.display = 'none';
            this.countCarrot--;
            this.count.textContent = this.countCarrot;
            if(this.countCarrot === 0) {
                this.onItemClick && this.onItemClick('carrot');
                this.countCarrot = this.initCountCarrot;
            }
        } else if(target.matches('.bug')) {
            sound.playBug();
            this.onItemClick && this.onItemClick('bug');
        }
    }
    startCountText() {
        this.count.textContent = this.initCountCarrot;
    }   
    initCount() {
        this.countCarrot = this.initCountCarrot;
    }
}

const rand = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
