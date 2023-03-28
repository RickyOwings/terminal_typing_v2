import { getWords } from './getWords.js';
import { playGame }from './playGame.js'
import { wait } from './wait.js'
import fs from 'fs';
import { titlescreen } from './titlescreen.js'
import modes from './modes.js'
import GAMEOBJ from './GameObj.js';
import multipleChoice from './multipleChoice.js';

const WORD_COUNT = 30;

const CHAR_WIDTH = 80;


async function main(){
    /**
     * Stores words within given text file
     */

    let gameObj: GAMEOBJ = await titlescreen();
    if (gameObj.url === null){
        await startRandomGame({});
    } else {
        switch(gameObj.mode){
            case modes[0]:
                await startRandomGame({});
            break;
            case modes[1]:
                await startQuoteGame(gameObj.url);
            break;
        }
    }

    await wait(3000);
    let answer = await multipleChoice("Play again?", "Yes", "No");
    if (answer == "Yes") await main();
    else process.exit();
}


/**
 *  Generates list of random words, given an array of words
 */
function generateRandomWords(words: string[], count: number): string[]{
    let ret_words: string[] = [];
    for (let i = 0; i < count; i++){
        let rand = Math.floor(Math.random() * words.length);
        ret_words.push(words[rand].replace("\r", ""));
    }
    return ret_words;
}

interface StartRandomArgs {
    url? : null | string,
    words? : number
}

function startRandomGame({url = null, words = WORD_COUNT}: StartRandomArgs): Promise<void>{
    return new Promise(async function(resolve){
        let wordlist: string[] | false = (url != null) ? getWords(url) : getWords();
        if (wordlist == false) return;
        let gameWords = generateRandomWords(wordlist, words);
        await playGame(gameWords, CHAR_WIDTH);
        resolve();
    })
}

function startQuoteGame(url: string): Promise<void>{
    return new Promise(async function(resolve){
        let gameWords = fs.readFileSync(url, {encoding: 'utf-8'});
        await playGame(gameWords, CHAR_WIDTH);
        resolve();
    })
}

main();