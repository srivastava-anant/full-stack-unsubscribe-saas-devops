require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

/* MIDDLEWARE */
app.use(cors());
app.use(express.json());

/* DATABASE CONNECTION */
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB Connected");
})
.catch((err) => {
    console.error("MongoDB Connection Error:", err);
});

/* TEST ROUTE */
app.get("/", (req, res) => {
    res.send("Backend API is running");
});

/* API ROUTES */
app.use("/api/services", require("./routes/serviceRoutes"));

/* SERVER START */
app.listen(5000, () => {
    console.log("Server running on port 5000");
});
