#!/usr/bin/env node

"use strict";

var inquirer = require("inquirer");
var chalk = require("chalk");
//const chalkAnimation = require('chalk-animation');
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
        kanataki()
        coolgraph()
        menu()
    }, 1000 * 10);
}

function kanataki() {
    console.log(
        chalk.yellow(
            figlet.textSync('Kanataki', { horizontalLayout: 'full' }))
    );
    console.log("Howdy, I am Kanataki and welcome to my cool resume!");
}

function coolgraph() {
    var Chart = require('cli-chart');

    Chart.prototype.drawBars = function() { // this function overrides the cli-chart drawBars prototype
        // working with max_size on the scale
        if (this.direction === 'x') {
            this.scale = this.width / this.max_size;
        } else {
            this.scale = this.height / this.max_size;
        }

        //using charm to write the bar labels
        var charm = this.charm;
        for (var i = 0; i < this.bars.length; i++) {
            if (this.direction === 'x') {
                charm.up(3).write(chart.barLabels[i]).pop(); // line writes bar label
                if (i != 0) charm.up(this.step);
                else charm.up(1).write(chart.barLabels[i]).pop(); // writes first bar label
            } else {
                if (i != 0) charm.right(this.step);
            }
            charm.push();
            this.bars[i].draw(this.scale);
            charm.pop();
        }
        if (this.direction === 'x') charm.down(this.step * this.bars.length + 1);
        charm.write('\n\n\n');
        if (this.direction === 'y') charm.write('\n');
    };

    var chart = new Chart({
        xlabel: 'Proficiency',
        ylabel: 'Skills',
        direction: 'x',
        width: 20,
        height: 10,
        lmargin: 15,
        step: 2
    });

    chart.barLabels = [ // the actual bar label to write
        'Machine Learning', 'Programming', 'Linux', 'Awesomeness'
    ]

    chart.addBar(6, 'red');
    chart.addBar(7, 'green');
    chart.addBar(9, 'white');
    chart.addBar(10, 'yellow');
    chart.draw();
}

function menu() {

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