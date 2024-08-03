#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import { differenceInSeconds } from "date-fns";
console.log(chalk.italic.yellow.bold(`
██████╗ ██████╗ ██╗   ██╗███╗   ██╗████████╗    ██████╗  ██████╗ ██╗    ██╗███╗   ██╗    ████████╗██╗███╗   ███╗███████╗
██╔════╝██╔═══██╗██║   ██║████╗  ██║╚══██╔══╝    ██╔══██╗██╔═══██╗██║    ██║████╗  ██║    ╚══██╔══╝██║████╗ ████║██╔════╝
██║     ██║   ██║██║   ██║██╔██╗ ██║   ██║       ██║  ██║██║   ██║██║ █╗ ██║██╔██╗ ██║       ██║   ██║██╔████╔██║█████╗  
██║     ██║   ██║██║   ██║██║╚██╗██║   ██║       ██║  ██║██║   ██║██║███╗██║██║╚██╗██║       ██║   ██║██║╚██╔╝██║██╔══╝  
╚██████╗╚██████╔╝╚██████╔╝██║ ╚████║   ██║       ██████╔╝╚██████╔╝╚███╔███╔╝██║ ╚████║       ██║   ██║██║ ╚═╝ ██║███████╗
 ╚═════╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝   ╚═╝       ╚═════╝  ╚═════╝  ╚══╝╚══╝ ╚═╝  ╚═══╝       ╚═╝   ╚═╝╚═╝     ╚═╝╚══════╝
`));
const start = await inquirer.prompt({
    name: "user",
    type: "number",
    message: chalk.italic.cyanBright.bold("Please enter the amount of second:"),
    validate: (input) => {
        if (isNaN(input)) {
            return chalk.italic.magentaBright.bold("Please enter valid number:");
        }
        else if (input > 60) {
            return chalk.italic.blueBright("Please enter less than 60 seconds:");
        }
        else {
            return true;
        }
    }
});
let ans = start.user;
function time(val) {
    let inTime = new Date().setSeconds(new Date().getSeconds() + val);
    const interTime = new Date(inTime);
    setInterval((() => {
        const currTime = new Date();
        let timeDiff = differenceInSeconds(interTime, currTime);
        if (timeDiff <= 0) {
            console.log(chalk.italic.redBright.bold("Time is up!"));
            process.exit();
        }
        const mint = Math.floor((timeDiff % (3600 * 24)) / 3600);
        let sec = Math.floor(timeDiff % 60);
        console.log(chalk.italic.yellow.bold(`${mint.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`));
    }), 1000);
    console.log("");
}
time(ans);
