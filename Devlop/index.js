const inquirer = require("inquirer");
const fs = require("fs");
const { promisify } = require("util");
const axios = require("axios");
const markdown = require("markdown");

const writeFileAsync = promisify(fs.writeFile);

async function promptUser() {
    const data = await inquirer.prompt([
        {
            type: "checkbox",
            message: "What is your favorite color?",
            name: "colors",
            choices: [
                "pink", 
                "blue", 
                "green", 
                "red"
    ]
        },
        {
            type: "input",
            name: "github",
            message: "Enter your GitHub Username"
        }

    ]);
    