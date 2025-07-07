/* 

Your task: Make a dog age calculator with Node.js!

Follow the instructions in the README.md file in this folder.

Run this file with the node command:
node dogAgeCalculator.js

*/
// Get arguments from the command line
const args = process.argv;

// Extract name and age from the command line arguments
const dogName = args[2];
const humanYears = parseInt(args[3]);

// Check if both values are provided and valid
if (!dogName || isNaN(humanYears) || humanYears <= 0) {
  console.log("Usage: node dogAgeCalculator.js <dogName> <humanYears>");
  process.exit(1);
}

// Calculate dog's age in dog years
let dogYears;
if (humanYears === 1) {
  dogYears = 15;
} else if (humanYears === 2) {
  dogYears = 15 + 9; // 24
} else {
  dogYears = 15 + 9 + (humanYears - 2) * 5;
}

// Output the result
console.log(`${dogName} is ${dogYears} years old in dog years.`);
