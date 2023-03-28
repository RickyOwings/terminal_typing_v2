import hideCursor from 'hide-terminal-cursor';
import showCursor from 'show-terminal-cursor';
import chalk from 'chalk'
import modes from './modes.js';
import fs from 'fs';
import path from 'path';
import { wait } from './wait.js'
import { KEYPRESS } from './KEYPRESS.js'
import multipleChoice from './multipleChoice.js';
import readline from 'readline'
import GAMEOBJ from './GameObj.js';
import { stringify } from 'querystring';
import { resolve } from 'path';

export async function titlescreen(): Promise<GAMEOBJ>{
    hideCursor();
    if (process.stdin.isTTY) process.stdin.setRawMode(true);
    return new Promise(async function(resolve) {
        console.clear();
        let mode: string = await multipleChoice("What mode do you want to play (w and s to choose, enter to select)", ...modes)

        let url = await getUrl(mode);

        showCursor();
        resolve({
            mode: mode,
            url: url
        });
    });
}

async function getUrl(mode: string): Promise<string|null>{
    return new Promise(async function(resolve){
        if (mode != modes[1]) resolve(null);
        let files = getFiles('./data/quotes');
        let quote = await multipleChoice("Which file do you want to type?", ...files);
        console.clear();
        console.log(`You choice is ${quote}`);
        await wait(1000);
        resolve(`./data/quotes/${quote}`);
    })
}

function getFiles(folderURL: string): string[]{
    const dPath = path.join(folderURL);
    return fs.readdirSync(dPath, {encoding: 'utf-8'})
}


async function countdown(start: number) {
    let countdown = start;
    return new Promise(async function (resolve){
        let timer = setInterval(()=>{
            if (countdown == 0){
                clearInterval(timer);
                resolve("done");
            }
            console.clear();
            console.log(countdown);
            countdown--;
        }, 1000)
    })
}