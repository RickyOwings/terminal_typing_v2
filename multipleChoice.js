var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import chalk from 'chalk';
import readline from 'readline';
import showCursor from 'show-terminal-cursor';
import hideCursor from 'hide-terminal-cursor';
function multipleChoice(question, ...answers) {
    return __awaiter(this, void 0, void 0, function* () {
        readline.emitKeypressEvents(process.stdin);
        hideCursor();
        if (process.stdin.isTTY)
            process.stdin.setRawMode(true);
        let selectionIndex = 0;
        printMultipleChoice(question, answers, selectionIndex);
        return new Promise(function (resolve) {
            return __awaiter(this, void 0, void 0, function* () {
                process.stdin.on('keypress', (str, key) => {
                    if (key.ctrl == true && key.name == 'c') {
                        showCursor();
                        process.exit();
                    }
                    ;
                    let seq = key.sequence;
                    if (seq == "\r") {
                        showCursor();
                        resolve(answers[selectionIndex]);
                    }
                    ;
                    if (seq == "w")
                        selectionIndex++;
                    if (seq == "s")
                        selectionIndex--;
                    // too small
                    if (selectionIndex < 0)
                        selectionIndex = answers.length - 1;
                    // too big
                    if (selectionIndex >= answers.length)
                        selectionIndex = 0;
                    printMultipleChoice(question, answers, selectionIndex);
                });
            });
        });
    });
}
function printMultipleChoice(question, answers, selectionIndex) {
    let printStr = `${question}\n`;
    for (let i = 0; i < answers.length; i++) {
        if (i == selectionIndex) {
            printStr += `>${answers[i]}\n`;
        }
        else {
            printStr += chalk.gray(`>${answers[i]}\n`);
        }
    }
    console.clear();
    console.log(printStr);
}
export default multipleChoice;
