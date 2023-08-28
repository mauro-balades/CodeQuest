import chalk from "chalk";
import prompts from "prompts";

import guessLanguage from "./games/guess-language.js";
import guessDescription from "./games/guess-description.js";

const SEPARATOR = chalk.bold("==============================================================");

console.log(chalk.bold(chalk.green(`
  _____          _       ____                  _   
 / ____|        | |     / __ \\                | |  
| |     ___   __| | ___| |  | |_   _  ___  ___| |_ 
| |    / _ \\ / _\` |/ _ \\ |  | | | | |/ _ \\/ __| __|
| |___| (_) | (_| |  __/ |__| | |_| |  __/\__ \\ |_ 
 \\_____\\___/ \\__,_|\\___|\\___\_\\\\__,_|\\___||___/\\__|      

`)));
console.log(SEPARATOR + "\n");

(async function() {
    let gameType = await prompts({
        type: "select", 
        message: "Select game mode",
        choices: [
          { title: "Guess the language from the code", value: "guess-language", },
          { title: "Guess the language from the description", value: "guess-description", },
        ]
    });

    if (gameType === "guess-language") {
        await guessLanguage();
    } else if (gameType === "guess-description") {
        await guessDescription();
    }

})()
