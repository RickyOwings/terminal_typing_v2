var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import hideCursor from 'hide-terminal-cursor';
import showCursor from 'show-terminal-cursor';
import chalk from 'chalk';
import readline from 'readline';
/**
 * Function that handles the typing game
 */
export function playGame(words, charWidth) {
    return __awaiter(this, void 0, void 0, function* () {
        hideCursor();
        let timeStart = Date.now();
        // string that represents the users input
        let userString = "";
        // string that represents what the user is trying to type
        let targetString = listToString(words);
        printGameState(userString, targetString, charWidth);
        // add the ability to listen for keypresses
        readline.emitKeypressEvents(process.stdin);
        // dont know what this does, but I saw this on the example
        if (process.stdin.isTTY)
            process.stdin.setRawMode(true);
        // called everytime a key is pressed
        process.stdin.on('keypress', (str, key) => {
            if (key.ctrl == true && key.name == 'c') {
                showCursor();
                process.exit();
            }
            ;
            userString = userInputUpdate(userString, key);
            if (printGameState(userString, targetString, charWidth)) {
                showCursor();
                let timeEnd = Date.now();
                let deltaTime = timeEnd - timeStart;
                let dTimeSec = deltaTime / 1000;
                let dTimeMin = dTimeSec / 60;
                console.log(`
Time Elapsed: ${deltaTime / 1000} seconds
WPM: ${words.length / dTimeMin}
CPM: ${targetString.length / dTimeMin}
            `);
                process.exit();
            }
        });
    });
}
function printGameState(userString, targetString, charWidth) {
    // the string that will be printed to the console
    let dispString = "";
    let dispUString = "";
    // the index of the word that the for loop is on
    let wordIndex = 0;
    // an array that contains all of the lengths of the words in the targetString
    let wordLengths = wordLengthArray(targetString);
    // iterate through each character sequentially
    for (let c = 0, // index of char user is on
    widthChar = 1, // index that wraps to zero when the width has been overflowed
    doEnter = false; // boolean that stored whether or not to add \n
     c < targetString.length; c++, widthChar++,
        doEnter = false) {
        // target char
        let tChar = targetString[c];
        // user char
        let uChar = (c < userString.length) ? userString[c] : "";
        // when a char is space, increment word index and byWordChar
        if (tChar == " ") {
            wordIndex++;
            if (widthChar + wordLengths[wordIndex] > charWidth) {
                widthChar = 1;
                doEnter = true;
            }
        }
        ;
        // target char is untyped by user
        if (uChar == "") {
            dispString += (c == userString.length) ? chalk.bgGray(tChar) : tChar;
            if (doEnter)
                dispString += "\n";
            continue;
        }
        dispUString += uChar;
        if (doEnter)
            dispUString += '\n';
        // target char is misstyped
        if (uChar != tChar) {
            dispString += chalk.red.underline(tChar);
            if (doEnter)
                dispString += "\n";
            continue;
        }
        // target char is correctly typed
        dispString += chalk.green.underline(tChar);
        if (doEnter)
            dispString += "\n";
    }
    let divider = "";
    for (let i = 0; i < charWidth; i++)
        divider += "-";
    console.clear();
    console.log(`TYPING TEST\n\n${dispString}\n${divider}\n${dispUString + '|'}`);
    if (userString == targetString)
        return true;
    return false;
}
/**
 * Converts an array of strings into a spaced out
 * string. ["word", "word"] -> "word word"
 */
function listToString(words) {
    let retString = "";
    console.log(words);
    for (let i = 0; i < words.length; i++) {
        retString += words[i];
        if (i != words.length - 1)
            retString += " ";
    }
    return retString;
}
/**
 * Updates the user input based on a keypress
 */
function userInputUpdate(userString, key) {
    if (key.name == 'backspace') {
        return userString.substring(0, userString.length - 1);
    }
    return userString + key.sequence;
}
function wordLengthArray(str) {
    let arr = str.split(" ");
    let retArr = [];
    for (let i in arr) {
        retArr.push(arr[i].length);
    }
    return retArr;
}
