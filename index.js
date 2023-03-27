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
const WORD_COUNT = 30;
const CHAR_WIDTH = 80;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        /**
         * Stores words within given text file
         */
        let wordsList;
        /**
         *
         */
        // stores url, if provided
        let url = (process.argv.length > 2) ? process.argv[2] : null;
        // temporary variable to ensure url is valid
        let tmp = (url != null) ? getWords(url) : getWords();
        // returns out of main function if url in invalid
        if (tmp == false) {
            console.log("url invalid");
            return;
        }
        // given url valid, assigns words array to url
        wordsList = tmp;
        let words = generateRandomWords(wordsList, WORD_COUNT);
        displayTitle();
        playGame(words, CHAR_WIDTH);
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
function displayTitle() {
    console.log(`
    +--------------------+
    |TERMINAL TYPING TEST|
    +--------------------+
    `);
}
main();
