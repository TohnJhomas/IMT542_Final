const express = require('express');
const readline = require('readline');
const fs = require('fs');
const { getPageByName, getResourceFromUri, rdfToMarkdownGrouped } = require('./utils'); // Assume utility functions are implemented

const app = express();

// Function to prompt user for input
function promptForInput(promptText) {
    return new Promise((resolve) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.question(promptText, (answer) => {
            rl.close();
            resolve(answer);
        });
    });
}

// Function to prompt user to select an option
async function promptUserToSelect(options) {
    return new Promise((resolve) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        console.log("Please select one of the following options:");
        options.forEach((option, idx) => {
            console.log(`${idx + 1}: ${option.label.value}`);
        });

        rl.question("Enter the number of your choice: ", (answer) => {
            const index = parseInt(answer, 10) - 1;
            rl.close();
            if (index >= 0 && index < options.length) {
                console.log("DEBUG: Selected index", index, "Option:", options[index]);
                resolve(options[index]);
            } else {
                console.log("Invalid selection. Exiting.");
                process.exit(1);
            }
        });
    });
}

// Main execution
(async () => {
    const SEARCH_TERM = await promptForInput("Enter a search term: ");
    const results = await getPageByName(SEARCH_TERM);

    if (results.error) {
        console.error(results.error);
        process.exit(1);
    }

    const selected = await promptUserToSelect(results);

    const desiredURI = selected.entity.value;

    console.log("Desired URI:", desiredURI);

    const resource = await getResourceFromUri(desiredURI);
    const resourceResponse = rdfToMarkdownGrouped(resource);
    

    fs.writeFileSync('output.md', resourceResponse, 'utf-8');
    console.log("Markdown file created: output.md");
})();
