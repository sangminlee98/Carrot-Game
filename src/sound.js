const bgm = new Audio('carrot/sound/bg.mp3');
const alertBgm = new Audio('carrot/sound/alert.wav');
const winBgm = new Audio('carrot/sound/game_win.mp3');
const carrotSound = new Audio('carrot/sound/carrot_pull.mp3');
const bugSound = new Audio('carrot/sound/bug_pull.mp3');

export function playCarrot() {
    playSound(carrotSound);
}
export function playBug() {
    playSound(bugSound);
}
export function playAlert() {
    playSound(alertBgm);
}
export function playWin() {
    playSound(winBgm);
}
export function playBgm() {
    playSound(bgm);
}
export function pauseBgm() {
    pauseSound(bgm);
}
const playSound = (sound) => {
    sound.currentTime = 0;
    sound.play();
}

const pauseSound = (sound) => {
    sound.pause();
}
