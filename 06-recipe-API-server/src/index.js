// ---------------------------------
// Boilerplate Code to Set Up Server
// ---------------------------------

// Importing our Node modules
import express from "express"; // The framework that lets us easily build a web server
import pg from "pg"; // pg is the module that helps us talk to a PostgreSQL database
import config from "./config.js"; // This file contains sensitive database credentials
import fs from "fs/promises"; // Importing file system module to read data from JSON files

// Create a connection pool to the PostgreSQL database
const db = new pg.Pool({
  connectionString: config.databaseUrl, // Use the database URL from config
  ssl: true, // Use SSL to keep the database connection secure
});

// Create the Express server
const app = express(); // Creating an instance of express

// Allow our server to accept and send JSON-formatted data
app.use(express.json());

// Choose the port number the server should listen on
const port = 3000;

// Start the server and log a message to confirm it’s running
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

// ---------------------------------
// Helper Functions
// ---------------------------------

// Read all recipes from the local JSON file
async function getAllRecipies() {
  // Read the file 'data.json' that contains the recipe data
  const data = await fs.readFile("../data.json", "utf8");
  // Convert the string data into a JavaScript array/object
  return JSON.parse(data);
}

// ---------------------------------
// API Endpoints
// ---------------------------------

// GET /get-all-recipes
// This endpoint sends all recipes to the client
app.get("/get-all-recipes", async (req, res) => {
  // Call our helper function to read all recipes from the file
  const recipes = await getAllRecipies();
  // Log to confirm it was called (for debugging)
  console.log("Gotemmmmmm");
  // Send back the recipes as a JSON response
  res.json(recipes);
});

// GET /get-one-recipe/:index
// This endpoint sends back one recipe based on its index in the array
app.get("/get-one-recipe/:index", async (req, res) => {
  // First, read the full list of recipes from the file
  const recipes = await getAllRecipies();
  // Convert the route parameter from a string to a number
  const index = Number(req.params.index);
  // Get the recipe at the given index
  const recipe = recipes[index];
  // Send it back as JSON
  res.json(recipe);
});
