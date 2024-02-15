#! /usr/bin/env node

import { execSync } from "child_process";

const POMODORO_INTERVAL = 30 // minutes
const POMODORO_POSTPONE = 3  // minutes

const seconds = (sec: number) => sec * 1000;

const getCurrentTime = () => {
    const now = new Date(Date.now());

    const hr = now.getHours().toString().padStart(2, '0');
    const min = now.getMinutes().toString().padStart(2, '0');
    const sec = now.getSeconds().toString().padStart(2, '0');

    return `${hr}:${min}:${sec}`;
}

const delay = (ms: number) => new Promise<void>(resolve => {
    setTimeout(() => {
        resolve();
    }, ms);
});

const showDialog = async () => {
    const script = `osascript -e '
        display dialog "Take a 5min break!" with title "Pomodoro timer!" buttons {"Postpone", "Ok"} default button "Ok" cancel button "Postpone" with icon caution
    '`;

    try {
        execSync(script);
        console.log('🚀 Pomodoro Finished', getCurrentTime());
    } catch (err) {
        console.log('🚀 Pomodoro Postponed', getCurrentTime());
        await setPomodoro(POMODORO_POSTPONE);
    }
}

const setPomodoro = async (min: number) => {
    for (let i = 0; i < min; i++) {
        await delay(seconds(60));
        console.log('🔸 Pomodoro Idle', getCurrentTime());
    }

    showDialog();
}

console.log('🚀 Pomodoro Started', getCurrentTime());
setPomodoro(POMODORO_INTERVAL);
