const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Initialize environment variables
dotenv.config();

const app = express();

// 1. MIDDLEWARE 
// Crucial: app.use(cors()) allows your browser to fetch data from the backend
app.use(cors());
app.use(express.json());

// 2. MONGOOSE CONNECTION
const MONGO_URI = process.env.MONGO_URI || "mongodb://mongo:27017/unsubscribe";

mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Connection Error:", err));

// 3. SERVICE MODEL
const serviceSchema = new mongoose.Schema({
  name: String,
  domain: String,
  link: String,
  plans: [String],
});

const Service = mongoose.model("Service", serviceSchema);

// 4. API ROUTES

// Get all services for the initial grid load
app.get("/api/services", async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch services" });
  }
});

// Get a single service by name for the plans modal
app.get("/api/services/:name", async (req, res) => {
  try {
    const service = await Service.findOne({ name: req.params.name });
    if (!service) return res.status(404).json({ error: "Service not found" });
    res.json(service);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Search route
app.get("/api/search", async (req, res) => {
  try {
    const query = req.query.q;
    const results = await Service.find({ name: new RegExp(query, 'i') });
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: "Search failed" });
  }
});

// Health check
app.get("/health", (req, res) => {
  res.send("Backend running");
});

// 5. SERVER START
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
