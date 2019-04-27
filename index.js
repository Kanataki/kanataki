#!/usr/bin/env node

"use strict";

var inquirer = require("inquirer");
var chalk = require("chalk");
var figlet = require("figlet");
const ora = require('ora');

const throbber = ora({
    text: 'Tinkering with all the Zoinkys',
    spinner: {
        frames: ['😎', '🧐', '🤓', '😊'],
        interval: 300, // Optional
    },
}).start();

var response = chalk.bold.green;

var coolresume = require("./coolresume.json");

var coolresumePrompts = {
    type: "list",
    name: "coolresumeOptions",
    message: "What shall I enlighten you about meself?",
    choices: [...Object.keys(coolresume), "Exit"]
};

function main() {
    // Simulating some asynchronous work for 10 seconds...
    setTimeout(() => {
        throbber.stop();
        menu()
    }, 1000 * 10);
}

function menu() {
    console.log(
        chalk.yellow(
            figlet.textSync('Kanataki', { horizontalLayout: 'full' }))
    );
    console.log("Howdy, I am Kanataki and welcome to my cool resume!");
    coolresumeHandler();
}

function coolresumeHandler() {
    inquirer.prompt(coolresumePrompts).then(answer => {
        if (answer.coolresumeOptions == "Exit") {
            return;
        }
        var option = answer.coolresumeOptions;
        console.log(response("--------------------------------------"));
        coolresume[`${option}`].forEach(info => {
            console.log(response("|   => " + info));
        });
        console.log(response("--------------------------------------"));
        // console.log(resume[`${option}`]);
        inquirer
            .prompt({
                type: "list",
                name: "exitBack",
                message: "Go back or Exit?",
                choices: ["Back", "Exit"]
            })
            .then(choice => {
                if (choice.exitBack == "Back") {
                    coolresumeHandler();
                } else {
                    return;
                }
            });
    });
}

main();