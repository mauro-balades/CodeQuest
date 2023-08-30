import languages from '../data/languages.js';
import prompt from 'prompts';
import clear from 'console-clear';

export default async function guessLanguage() {
    // A list of flags if the user was correct or not
    const flags = [];
    const langs = [];

    while (true) {
        const language = Object.keys(languages)[Math.floor(Math.random() * Object.keys(languages).length)];
        if (langs.includes(language)) continue;
        langs.push(language);
        
        // We mask the language code with '*' and remove the masked lines from the 
        // code as time passes
        let normalCode = languages[language].code[Math.floor(Math.random() * languages[language].code.length)].split('\n');
        let maskedCode = normalCode.map(line => line.replace(/./g, '*'));
        let numMaskedLines = -1;

        // fetch other 3 "wrong" languages
        const otherLanguages = Object.keys(languages).filter(l => l !== language);
        const otherLanguagesIndexes = [];
        while (otherLanguagesIndexes.length < 1) {
            const index = Math.floor(Math.random() * otherLanguages.length);
            if (!otherLanguagesIndexes.includes(index)) otherLanguagesIndexes.push(index);
        }

        // We unmask a line every 3 seconds
        while (true) {
            if (numMaskedLines === normalCode.length) break; 

            clear(true);
            console.log(`\n=======================================\n`);
            
            numMaskedLines++;
            maskedCode[numMaskedLines] = normalCode[numMaskedLines];
            console.log(maskedCode.join('\n'));

            console.log(`=======================================\n`)
            // We ask the user to guess the language
            const response = prompt({
                type: 'select',
                name: 'language',
                message: `What language is this?`,
                choices: [
                    { title: language, value: true },
                    ...otherLanguagesIndexes.map(i => ({ title: otherLanguages[i], value: false })),
                ],
            }).then(response => {
                flags.push(response.language);
            });

            await setTimeout(() => {}, 3000);
        }
    }
}
