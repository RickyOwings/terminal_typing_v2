import fs from 'fs'

const WORD_URL: string = './data/word_lists/1-1000.txt';

/**
 * Gets the words in the url provided or
 * the detault url stored within WORD_URL 
 */
export function getWords(...args : string[]): string[] | false{
    
    // stores the used url of the function
    let u_url = WORD_URL;

    // if we pass something into the function, then set the url equal to the first thing passed
    if (args.length) u_url = args[0];

    // tries to return string of the files contained within the url provided
    try {
        let fileString = fs.readFileSync(u_url, {encoding: 'utf-8'});
        return fileString.split("\n");
    } catch (error) {
        return false
    }
    
}