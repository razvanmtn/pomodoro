import { execSync } from "child_process";

const POMODORO_INTERVAL = 30 // minutes
const POMODORO_POSTPONE = 3  // minutes

const seconds = (sec: number) => sec * 1000;
const minutes = (min: number) => seconds(min * 60);

export const script = `osascript -e '
    display dialog "Take a 5min break!" with title "Pomodoro timer!" buttons {"Postpone", "Ok"} default button "Ok" cancel button "Postpone" with icon caution
'`;

const setPomodoro = (time: number) => {
    console.log('Pomodoro timer started!');

    setTimeout(() => {
        try {
            execSync(script);
            console.log('Pomodoro finished!');
        } catch (err) {
            console.log('Pomodoro postponed!');
            setPomodoro(minutes(POMODORO_POSTPONE));
        }
    }, time);
}

setPomodoro(minutes(POMODORO_INTERVAL));

