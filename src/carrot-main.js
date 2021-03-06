import Alert from './alert.js';
import GameBuilder, { Reason } from './game.js';

const gameFinishBanner = new Alert();
const game = new GameBuilder()
    .setCarrotCount(10)
    .setBugCount(15)
    .setDuration(10)
    .build();
gameFinishBanner.setClickListener(() => {
    game.start();
})
game.setGameStopListener(reason => {
    switch(reason) {
        case Reason.pause:
            gameFinishBanner.replayShow();
            break;
        case Reason.lost:
            gameFinishBanner.lostShow();
            break;
        case Reason.won:
            gameFinishBanner.wonShow();
            break;
        default:
            throw new Error('not valid reason');
    }
})
