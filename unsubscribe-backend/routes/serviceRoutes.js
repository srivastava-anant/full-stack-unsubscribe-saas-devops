const express = require("express");
const router = express.Router();
const Service = require("../models/Service");

router.get("/featured", async (req, res) => {
    const services = await Service.find({ top: true });
    res.json(services);
});

router.get("/search", async (req, res) => {
    const query = req.query.q;
    const services = await Service.find({
        name: { $regex: query, $options: "i" }
    });
    res.json(services);
});

router.get("/:name", async (req, res) => {
    const service = await Service.findOne({ name: req.params.name });
    res.json(service);
});

router.post("/", async (req, res) => {
    const service = new Service(req.body);
    await service.save();
    res.json({ message: "Service added" });
});

module.exports = router;
