const carrotSound = new Audio('carrot/sound/carrot_pull.mp3');
const bugSound = new Audio('carrot/sound/bug_pull.mp3');
export default class Field {
    constructor(countCarrot) {
        this.countCarrot = countCarrot;
        this.count = document.querySelector('.count');
        this.field = document.querySelector('.play-field');
        this.fieldRect = this.field.getBoundingClientRect();
        this.field.addEventListener('click', (event) => this.onClick(event));
    };
    setClickListener(onItemClick) {
        this.onItemClick = onItemClick;
    }
    randomPosition(object) {
        const positionX = rand(0,this.fieldRect.width-80);
        const positionY = rand(0,this.fieldRect.height-80);
        object.style.top = `${positionY}px`;
        object.style.left = `${positionX}px`;
    }
    onClick(e) {
        const target = e.target;
        if(target.matches('.carrot')) {
            playSound(carrotSound);
            target.style.display = 'none';
            this.countCarrot--;
            this.count.textContent = this.countCarrot;
            if(this.countCarrot === 0) {
                this.onItemClick && this.onItemClick('carrot');
                this.countCarrot = 10;
            }
        } else if(target.matches('.bug')) {
            playSound(bugSound);
            this.onItemClick && this.onItemClick('bug');
        }
    }
    startCountText() {
        this.count.textContent = 10;
    }   
    initCount() {
        this.countCarrot = 10;
    }
}

const rand = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
const playSound = (sound) => {
    sound.currentTime = 0;
    sound.play();
}
