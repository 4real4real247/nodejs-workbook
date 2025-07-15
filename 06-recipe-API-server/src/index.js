// Write your Recipe CRUD App code here!

// ---------------------------------
// Boilerplate Code to Set Up Server
// ---------------------------------
import express from "express"; // the framework we use to build a web server
import fs from "fs/promises"; // the File System module that lets us read files

// Creating an instance of the express module so that we can use all of its superpowers, including its functions, properties, etc.
const app = express();

// Define which port our server should listen to receive requests
const port = 3000;

// say that we're using JSON data type
// Our server will receive data as JSON, and respond with JSON
app.use(express.json());

// run the function that turns on the server to listen for requests on the port
app.listen(port, () => {
  console.log(`My server is listening on port ${port}!`);
});

// ==========================
// Additional code starts here
// ==========================

// ---------------------------------
// Helper Functions
// ---------------------------------
// Read the recipe data from data.json
const readRecipes = async () => {
  const rawData = await fs.readFile("./data.json", "utf8");
  return JSON.parse(rawData);
};

// Write updated recipes back to data.json
const writeRecipes = async (recipes) => {
  await fs.writeFile("./data.json", JSON.stringify(recipes, null, 2), "utf8");
};

// ---------------------------------
// API Endpoints
// ---------------------------------

// TODO: API Endpoint for handling GET requests to /get-all-recipes
app.get("/get-all-recipes", async (req, res) => {
  const recipes = await readRecipes();
  res.json(recipes);
});

// TODO: API Endpoint for handling GET requests to /get-one-recipe/:index
app.get("/get-one-recipe/:index", async (req, res) => {
  const recipes = await readRecipes();
  const index = Number(req.params.index);
  const recipe = recipes[index];
  res.json(recipe);
});

// TODO: API Endpoint for handling GET requests to /delete-one-recipe/:index
app.get("/delete-one-recipe/:index", async (req, res) => {
  const recipes = await readRecipes();
  const index = Number(req.params.index);
  const deletedRecipe = recipes.splice(index, 1)[0];
  await writeRecipes(recipes);
  res.json(deletedRecipe);
});

// TODO: API Endpoint for handling GET requests to /update-one-recipe-name/:index/:newName
app.get("/update-one-recipe/:index/:newName", async (req, res) => {
  const recipes = await readRecipes();
  const index = Number(req.params.index);
  const newName = req.params.newName;
  recipes[index].name = newName;
  await writeRecipes(recipes);
  res.json(recipes[index]);
});
