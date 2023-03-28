var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getWords } from './getWords.js';
import { playGame } from './playGame.js';
import { wait } from './wait.js';
import fs from 'fs';
import { titlescreen } from './titlescreen.js';
import modes from './modes.js';
import multipleChoice from './multipleChoice.js';
const WORD_COUNT = 30;
const CHAR_WIDTH = 80;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        /**
         * Stores words within given text file
         */
        let gameObj = yield titlescreen();
        if (gameObj.url === null) {
            yield startRandomGame({});
        }
        else {
            switch (gameObj.mode) {
                case modes[0]:
                    yield startRandomGame({});
                    break;
                case modes[1]:
                    yield startQuoteGame(gameObj.url);
                    break;
            }
        }
        yield wait(3000);
        let answer = yield multipleChoice("Play again?", "Yes", "No");
        if (answer == "Yes")
            yield main();
        else
            process.exit();
    });
}
/**
 *  Generates list of random words, given an array of words
 */
function generateRandomWords(words, count) {
    let ret_words = [];
    for (let i = 0; i < count; i++) {
        let rand = Math.floor(Math.random() * words.length);
        ret_words.push(words[rand].replace("\r", ""));
    }
    return ret_words;
}
function startRandomGame({ url = null, words = WORD_COUNT }) {
    return new Promise(function (resolve) {
        return __awaiter(this, void 0, void 0, function* () {
            let wordlist = (url != null) ? getWords(url) : getWords();
            if (wordlist == false)
                return;
            let gameWords = generateRandomWords(wordlist, words);
            yield playGame(gameWords, CHAR_WIDTH);
            resolve();
        });
    });
}
function startQuoteGame(url) {
    return new Promise(function (resolve) {
        return __awaiter(this, void 0, void 0, function* () {
            let gameWords = fs.readFileSync(url, { encoding: 'utf-8' });
            yield playGame(gameWords, CHAR_WIDTH);
            resolve();
        });
    });
}
main();
