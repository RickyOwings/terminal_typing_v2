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
import modes from './modes.js';
import fs from 'fs';
import path from 'path';
import { wait } from './wait.js';
import multipleChoice from './multipleChoice.js';
export function titlescreen() {
    return __awaiter(this, void 0, void 0, function* () {
        hideCursor();
        if (process.stdin.isTTY)
            process.stdin.setRawMode(true);
        return new Promise(function (resolve) {
            return __awaiter(this, void 0, void 0, function* () {
                console.clear();
                let mode = yield multipleChoice("What mode do you want to play (w and s to choose, enter to select)", ...modes);
                let url = yield getUrl(mode);
                showCursor();
                resolve({
                    mode: mode,
                    url: url
                });
            });
        });
    });
}
function getUrl(mode) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise(function (resolve) {
            return __awaiter(this, void 0, void 0, function* () {
                if (mode != modes[1])
                    resolve(null);
                let files = getFiles('./data/quotes');
                let quote = yield multipleChoice("Which file do you want to type?", ...files);
                console.clear();
                console.log(`You choice is ${quote}`);
                yield wait(1000);
                resolve(`./data/quotes/${quote}`);
            });
        });
    });
}
function getFiles(folderURL) {
    const dPath = path.join(folderURL);
    return fs.readdirSync(dPath, { encoding: 'utf-8' });
}
function countdown(start) {
    return __awaiter(this, void 0, void 0, function* () {
        let countdown = start;
        return new Promise(function (resolve) {
            return __awaiter(this, void 0, void 0, function* () {
                let timer = setInterval(() => {
                    if (countdown == 0) {
                        clearInterval(timer);
                        resolve("done");
                    }
                    console.clear();
                    console.log(countdown);
                    countdown--;
                }, 1000);
            });
        });
    });
}
