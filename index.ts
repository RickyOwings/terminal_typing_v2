import { getWords } from './getWords.js';
import { playGame } from './playGame.js'
import { wait } from './wait.js'

const WORD_COUNT = 30;

const CHAR_WIDTH = 80;


async function main(){
    /**
     * Stores words within given text file
     */
    let wordsList: string[];

    /**
     *  
     */
    // stores url, if provided
    let url = (process.argv.length > 2) ? process.argv[2] : null;

    // temporary variable to ensure url is valid
    let tmp: string[] | false = (url != null) ? getWords(url) : getWords();   

    // returns out of main function if url in invalid
    if (tmp == false){console.log("url invalid"); return;}

    // given url valid, assigns words array to url
    wordsList = tmp;

    let words = generateRandomWords(wordsList, WORD_COUNT)

    displayTitle();

    playGame(words, CHAR_WIDTH);
}


/**
 *  Generates list of random words, given an array of words
 */
function generateRandomWords(words: string[], count: number): string[]{
    let ret_words: string[] = [];
    for (let i = 0; i < count; i++){
        let rand = Math.floor(Math.random() * words.length);
        ret_words.push(words[rand]);
    }
    return ret_words;
}


function displayTitle(){
    console.log(`
    +--------------------+
    |TERMINAL TYPING TEST|
    +--------------------+
    `);
}


main();

