/* 
YOUR TASK: 
Create a program that determines the birthstone for a month inputted by the user. 
Your app should read birthstone data from the data.json file.

REQUIREMENTS:
- Your program should accept 1 user input: a year (such as "January")
- Your program should output a console.log() message that says the month's birthstone, such as...
    - "The birthstone for January is Garnet."
    - "The birthstone for July is Ruby." 
*/
// allowing the file to access the file system Node moudle
//the fs moudle is built into N0ode
// the new way to do fs is using es moudle
import { readFile } from "fs";
//this is the CommonJS sysntax it lets us read data from somewhere else (data.json)
//const fs = require("fs");
//console.log(fs);

//get user input
// we want the user to input a month

const month = process.argv[2];
console.log(month);

function getBirthstone() {
  //we're gonna use the readfile method to read from the data.json file
  // 1.this file we want to read
  //2. the way the file is encoded
  //3. the function we run once we've read the file
  readFile("./data.json", "utf8", (err, data) => {
    //console.log(data);
    const birthstoneData = JSON.parse(data);

    // tell the user their birthsone
    if (birthstoneData[month]) {
      console.log(`The birthstone for ${month} is ${birthstoneData[month]}`);
    } else {
      console.log("Invalid month, Please enter a valid month!");
    }
  });
}

// run my function
getBirthstone();
