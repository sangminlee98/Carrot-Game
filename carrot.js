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

let state = false;

let time = 9;
let counting;
let countCarrot = 10;

const timerStart = () => {
    state = !state;
    statusToggle();
    if(state) {
        document.querySelector('.timer').innerHTML = '00:10';
        startTimer(); 
    } else {
        stopTimer();
        replay.style.display = 'flex';
    }
}

const startTimer = () => {
    lost.style.display = 'none';
    startBtn.style.display = 'block';
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
            clearInterval(counting);
            document.querySelector('.timer').innerHTML = 'Time Over';
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
}

const statusToggle = () => { 
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
    positionX = rand(130,1250);
    positionY = rand(350,520);
    object.style.top = `${positionY}px`;
    object.style.left = `${positionX}px`;
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

carrots.forEach(carrot => {
    carrot.addEventListener('click', () => {
        carrot.style.display = 'none';
        countCarrot--;
        count.textContent = countCarrot;
        if(countCarrot === 0) {
            state = !state;
            stopTimer();
            won.style.display = 'flex';
            
        }
    })
})

bugs.forEach(bug => {
    bug.addEventListener('click', () => {
        state = !state;
        stopTimer();
        lost.style.display = 'flex';
    })
})