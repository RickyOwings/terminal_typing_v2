"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getWords_1 = require("./getWords");
const WORD_COUNT = 30;
const CHAR_WIDTH = 80;
function main() {
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
    let tmp = (url != null) ? (0, getWords_1.getWords)(url) : (0, getWords_1.getWords)();
    // returns out of main function if url in invalid
    if (tmp == false) {
        console.log("url invalid");
        return;
    }
    // given url valid, assigns words array to url
    wordsList = tmp;
    let words = generateRandomWords(wordsList, WORD_COUNT);


}
/**
 *  Generates list of random words, given an array of words
 */
function generateRandomWords(words, count) {
    let ret_words = [];
    for (let i = 0; i < count; i++) {
        let rand = Math.random() * words.length;
        ret_words.push(words[rand]);
    }
    return ret_words;
}
main();
