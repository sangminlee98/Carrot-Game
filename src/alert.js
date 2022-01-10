export default class Alert {
    constructor() {
        this.alertBox = document.querySelectorAll('.alert');
        this.lost = document.querySelector('.lost');
        this.replay = document.querySelector('.replay');
        this.won = document.querySelector('.won');
        this.restart = document.querySelectorAll('.restart');
        this.restart.forEach(item => {
            item.addEventListener('click', () => {
                this.onClick && this.onClick();
                this.boxHide();
            });
        });
    }

    setClickListener(onClick) {
        this.onClick = onClick;
    };

    lostShow() {
        this.lost.style.display = 'block';
    }

    replayShow() {
        this.replay.style.display = 'block';
    }

    wonShow() {
        this.won.style.display = 'block';
    }
    boxHide() {
        this.alertBox.forEach(box => {
            box.style.display = 'none';
        });
    }

}