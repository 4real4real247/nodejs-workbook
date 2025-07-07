// Run this file with the node command:
// node index.js

const myName = process.argv[2];
if (myName) {
  console.log(`Greetings, ${myName}!`);
} else {
  // Change this name
  console.log(`Hello, world`);
}
