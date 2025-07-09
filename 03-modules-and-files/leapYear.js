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

// Function to check if a year is a leap year
function checkLeapYear(year) {
  const m = moment([year]);
  if (m.isLeapYear()) {
    console.log(`${year} is a leap year!`);
  } else {
    console.log(`${year} is not a leap year!`);
  }
}

// Accept user input from the command line
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

readline.question('Enter a year: ', input => {
  const year = parseInt(input);
  if (!isNaN(year)) {
    checkLeapYear(year);
  } else {
    console.log('Invalid input. Please enter a valid year.');
  }
  readline.close();
});
