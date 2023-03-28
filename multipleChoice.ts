import chalk from 'chalk';
import readline from 'readline';
import { KEYPRESS } from './KEYPRESS';
import showCursor from 'show-terminal-cursor';
import hideCursor from 'hide-terminal-cursor';

async function multipleChoice(question: string,...answers: string[]): Promise<string>{
    readline.emitKeypressEvents(process.stdin);
    hideCursor();
    if (process.stdin.isTTY) process.stdin.setRawMode(true);

    let selectionIndex = 0;
    printMultipleChoice(question, answers, selectionIndex);
    return new Promise(async function(resolve){
        process.stdin.on('keypress', (str, key: KEYPRESS)=>{
            if(key.ctrl == true && key.name == 'c') {
                showCursor();
                process.exit();
            };
            let seq = key.sequence;
            if (seq == "\r") {
                showCursor();
                resolve(answers[selectionIndex]);
            };
            if (seq == "w") selectionIndex++;
            if (seq == "s") selectionIndex--;
            // too small
            if (selectionIndex < 0) selectionIndex = answers.length - 1;
            // too big
            if (selectionIndex >= answers.length) selectionIndex = 0;
            printMultipleChoice(question, answers, selectionIndex);
        });
    })
}

function printMultipleChoice(question: string, answers: string[], selectionIndex: number): void{
    let printStr = `${question}\n`;
    for (let i = 0; i < answers.length; i++){
        if (i == selectionIndex){
            printStr += chalk.green(`>${answers[i]}\n`);
        } else {
            printStr += chalk.gray(`>${answers[i]}\n`);
        }
    }
    console.clear();
    console.log(printStr);
}

export default multipleChoice;