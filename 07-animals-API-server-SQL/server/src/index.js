// ---------------------------------
// Boilerplate Code to Set Up Server
// ---------------------------------

// Load the Express framework to handle web server functions
import express from "express";

// Load pg module to connect with the PostgreSQL database
import pg from "pg";

// Load configuration values (like database credentials) from an external file
import config from "./config.js";

// Create a connection pool to the PostgreSQL database using credentials from config
const db = new pg.Pool({
  connectionString: config.databaseUrl, // The address and password for the database
  ssl: true, // Use secure encrypted connection
});

// Initialize an Express application (your web server)
const app = express();

// This ensures incoming and outgoing data is in JSON format
app.use(express.json());

// Choose a port for the server to listen on
const port = 3000;

// Start the server and log a message to indicate it's running
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

// ---------------------------------
// Helper Functions
// ---------------------------------

// Fetch all animals from the database
async function getAllAnimals() {
  const result = await db.query("SELECT * FROM animals"); // Run SQL query
  console.log(result); // Log the full result to the console
  return result.rows; // Return just the rows (actual data)
}

// Fetch a single animal by name
async function getOneAnimal(animalName) {
  const result = await db.query("SELECT * FROM animals WHERE name = $1", [
    animalName, // Use parameterized query to avoid SQL injection
  ]);
  return result.rows[0]; // Return just the first matching row
}

// Delete an animal by name
async function deleteOneAnimal(animalName) {
  await db.query("DELETE FROM animals WHERE name = $1", [animalName]);
}

// Add a new animal record to the database
async function addOneAnimal(animal) {
  console.log(animal, "this is the one"); // Debug log of incoming data
  await db.query(
    "INSERT INTO animals (name, category, can_fly, lives_in) VALUES ($1, $2, $3, $4)",
    [animal.name, animal.category, animal.can_fly, animal.lives_in] // Insert new values
  );
}

// Update an existing animal's details
async function updateOneAnimal(animal) {
  await db.query(
    "UPDATE animals SET category = $1, can_fly = $2, lives_in = $3 WHERE name = $4",
    [animal.category, animal.can_fly, animal.lives_in, animal.name] // Update values based on name match
  );
}

// ---------------------------------
// API Endpoints
// ---------------------------------

// Endpoint to get all animals
app.get("/get-all-animals", async (req, res) => {
  const allAnimals = await getAllAnimals(); // Call helper function
  res.json(allAnimals); // Send JSON response with all animal records
});

// Endpoint to get one animal by name
app.get("/get-one-animal/:name", async (req, res) => {
  const animalName = req.params.name; // Read the name from the URL path
  const animal = await getOneAnimal(animalName); // Call helper function
  console.log(animal, "this is the animal"); // Debug output
  res.json(animal); // Send the animal info as JSON
});

// Endpoint to delete one animal by name
app.get("/delete-one-animal/:name", async (req, res) => {
  const animalName = req.params.name; // Read the name from the URL path
  await deleteOneAnimal(animalName); // Call helper function
  res.send("The animal was successfully deleted!"); // Respond with a success message
});

// Endpoint to add a new animal (POST request with JSON body)
app.post("/add-one-animal", async (req, res) => {
  const newAnimal = req.body; // Get the animal data from the request body
  await addOneAnimal(newAnimal); // Add the animal to the database
  res.send("The animal was successfully added!"); // Respond with a success message
});

// Endpoint to update an existing animal (POST request with JSON body)
app.post("/update-one-animal", async (req, res) => {
  const updateAnimal = req.body; // Get updated data from the request body
  await updateOneAnimal(updateAnimal); // Update the animal in the database
  res.send("The animal was successfully updated!"); // Respond with a success message
});
