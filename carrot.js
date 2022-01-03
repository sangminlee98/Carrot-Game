const startBtn = document.querySelector('.start');
const timer = document.querySelector('.timer');
const alertBox = document.querySelectorAll('.alert');
const lost = document.querySelector('.lost');
const replay = document.querySelector('.replay');
const restart = document.querySelectorAll('.restart');

let state = false;

let time = 9;
let counting

const timerStart = () => {
    state = !state;
    statusToggle();
    if(state) {
        document.querySelector('.timer').innerHTML = '00:10';
        startTimer(); 
    } else {
        stopTimer();
    }
}

const startTimer = () => {
    lost.style.display = 'none';
    startBtn.style.display = 'block';
    state = true;
    counting = setInterval(() => {
        document.querySelector('.timer').innerHTML = `00:0${time}`;
        time--;
        if(time<0){
            clearInterval(counting);
            document.querySelector('.timer').innerHTML = '시간초과';
            statusToggle();
            time = 9;
            startBtn.style.display = 'none';
            lost.style.display = 'flex';
        };
    },1000); 
};
const stopTimer = () => {
    startBtn.style.display = 'none';
    clearInterval(counting);
    time = 9;
    replay.style.display = 'flex';
}

const statusToggle = () => { 
    if(state) {
        startBtn.innerHTML = `<i class="fas fa-stop fa-2x"></i>`;
    } else {
        startBtn.innerHTML = `<i class="fas fa-play fa-2x"></i>`;
    }
}



startBtn.addEventListener('click', timerStart);
restart.forEach(item => {
    item.addEventListener('click', () => {
        state = false;
        timerStart();
        alertBox.forEach(box => {
            box.style.display = 'none';
        })
    });
})
