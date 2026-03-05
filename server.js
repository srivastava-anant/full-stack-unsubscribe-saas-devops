const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());

/*
MongoDB Connection
Important: inside Kubernetes we use the service name "mongo"
*/
const MONGO_URI = process.env.MONGO_URI || "mongodb://mongo:27017/unsubscribe";

mongoose.connect(MONGO_URI, {
useNewUrlParser: true,
useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));

/*
Service Schema
*/
const serviceSchema = new mongoose.Schema({
name: String,
domain: String,
link: String,
top: Boolean,
plans: [String]
});

const Service = mongoose.model("Service", serviceSchema);

/*
Seed database from services.json if empty
*/
const seedDatabase = async () => {
try {
const count = await Service.countDocuments();

```
if (count === 0) {
  const dataPath = path.join(__dirname, "services.json");
  const rawData = fs.readFileSync(dataPath);
  const services = JSON.parse(rawData);

  await Service.insertMany(services);
  console.log("Database seeded with services");
} else {
  console.log("Database already contains data");
}
```

} catch (error) {
console.error("Seeding error:", error);
}
};

mongoose.connection.once("open", seedDatabase);

/*
Routes
*/

// Get all services
app.get("/api/services", async (req, res) => {
try {
const services = await Service.find();
res.json(services);
} catch (error) {
res.status(500).json({ error: "Failed to fetch services" });
}
});

// Get featured services
app.get("/api/services/featured", async (req, res) => {
try {
const services = await Service.find({ top: true });
res.json(services);
} catch (error) {
res.status(500).json({ error: "Failed to fetch featured services" });
}
});

// Search services
app.get("/api/services/search", async (req, res) => {
try {
const query = req.query.q;

```
const services = await Service.find({
  name: { $regex: query, $options: "i" }
});

res.json(services);
```

} catch (error) {
res.status(500).json({ error: "Search failed" });
}
});

/*
Health check
*/
app.get("/health", (req, res) => {
res.send("Backend running");
});

/*
Server
*/
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});

