const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const { MongoClient, ServerApiVersion } = require("mongodb");
const taskRoutes = require("./routes/taskRoutes");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB URI
const uri = process.env.MONGO_URI || "mongodb+srv://saikrishna:<db_password>@cluster1.6xshj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1";

// Create a MongoClient instance
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Function to connect to MongoDB and start the server
async function startServer() {
  try {
    // Connect the client to MongoDB
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. Successfully connected to MongoDB!");

    // Routes
    app.use("/api/tasks", taskRoutes);

    // Start the server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit the process on failure
  } finally {
    // Optionally, the client can stay open for the app's lifetime
    // await client.close(); // Uncomment to close the connection after use
  }
}

// Start the server
startServer().catch(console.error);