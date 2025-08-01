/* 
YOUR TASK: 
Create a program that checks to see if the current year is a leap year.
Use the Moment module: https://www.npmjs.com/package/moment and read its documentation to find out how to determine whether a year is a leap year.

REQUIREMENTS:
- Your program should accept 1 user input: a year (such as "January")
- Your program should output a console.log() message that says whether the inputted year is a leap year, such as...
    - "2024 is a leap year!"
    - "1979 is not a leap year!"
*/
import moment from moment

const moment = require('moment');

// Accept user input from command line
const input = process.argv[2];

// Try to convert input to a number
const year = parseInt(input, 2005);

if (isNaN(year)) {
    console.log(`"${input}" is not a valid year. Please enter a number like 2024.`);
} else {
    const isLeap = moment([year]).isLeapYear();

    if (isLeap) {
        console.log(`${year} is a leap year!`);
    } else {
        console.log(`${year} is not a leap year!`);
    }
}

