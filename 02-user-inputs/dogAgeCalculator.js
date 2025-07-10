/* 

Your task: Make a dog age calculator with Node.js!

Follow the instructions in the README.md file in this folder.

Run this file with the node command:
node dogAgeCalculator.js

*/
// Get arguments from the command line
// 'process.argv' is an array that contains command-line arguments.
// args[0] is usually 'node', args[1] is the filename, and the rest are user inputs.
const args = process.argv;

// We get the 3rd item (index 2) from the command-line input — this is the dog's name.
const dogName = args[2];

// We get the 4th item (index 3), which should be the human age, and convert it to a number.
const humanYears = parseInt(args[3]);

// This checks if:
// - dogName is missing (undefined or empty)
// - humanYears is not a number (NaN)
// - humanYears is 0 or negative (invalid age)
//
// If any of these conditions are true, it shows a usage message and stops the program.
if (!dogName || isNaN(humanYears) || humanYears <= 0) {
  console.log("Usage: node dogAgeCalculator.js <dogName> <humanYears>");
  process.exit(1); // Exit the program with an error code
}

// Now we calculate the dog's age in "dog years" using a special rule:
// - First human year = 15 dog years
// - Second human year = 9 more dog years (total 24)
// - Each year after that = 5 more dog years

let dogYears; // We'll store the result here

if (humanYears === 1) {
  // If the dog is 1 human year old, that equals 15 dog years
  dogYears = 15;
} else if (humanYears === 2) {
  // If the dog is 2 human years old, that equals 15 + 9 = 24 dog years
  dogYears = 15 + 9;
} else {
  // For 3+ years: 15 (first year) + 9 (second year) + 5 * (remaining years)
  dogYears = 15 + 9 + (humanYears - 2) * 5;
}

// Print the result in a sentence format
console.log(`${dogName} is ${dogYears} years old in dog years.`);
