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
    const { github, colors } = data;

    console.log(colors)
    const profileData = await axios.get(`https://api.github.com/users/${github}`)
    console.log(profileData)
    const markdown = makeMarkdown(profileData.data, colors);
    console.log(markdown)

    fs.writeFile(`${profileData.data.login}.md`, markdown, (err) => {
        if (err) throw err
        console.log("wrote the file")
    });
};
function makeMarkdown(userInfo, color) {
    return `# <span style="color:${color}"> ${userInfo.name}</span>  
<img src="${userInfo.avatar_url}" alt="coder photo" height="75"><br>
Username: ${userInfo.login}  
Bio: ${userInfo.bio}  
Repo URL: [repo link](${userInfo.repos_url})  
Public Repos:  ${userInfo.public_repos}  
Followers: ${userInfo.followers}  
Following: ${userInfo.following}  
`
}

promptUser();