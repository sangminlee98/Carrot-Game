import Alert from './alert.js';
import Game from './game.js';

const gameFinishBanner = new Alert();
const game = new Game();
gameFinishBanner.setClickListener(() => {
    game.start();
})
game.setGameStopListener(reason => {
    switch(reason) {
        case 'pause':
            gameFinishBanner.replayShow();
            break;
        case 'lost':
            gameFinishBanner.lostShow();
            break;
        case 'won':
            gameFinishBanner.wonShow();
            break;
        default:
            throw new Error('not valid reason');
    }
})
