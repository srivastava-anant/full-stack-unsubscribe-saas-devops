const express = require("express");
const router = express.Router();
const Service = require("../models/Service");


/* GET FEATURED SERVICES */

router.get("/featured", async (req, res) => {
    try {

        const services = await Service.find({ top: true });

        res.json(services);

    } catch (err) {

        console.error(err);
        res.status(500).json({ error: "Failed to fetch featured services" });

    }
});


/* SEARCH SERVICES */

router.get("/search", async (req, res) => {

    try {

        const query = req.query.q || "";

        const services = await Service.find({
            name: { $regex: query, $options: "i" }
        });

        res.json(services);

    } catch (err) {

        console.error(err);
        res.status(500).json({ error: "Search failed" });

    }

});


/* GET SERVICE BY NAME */

router.get("/:name", async (req, res) => {

    try {

        const service = await Service.findOne({ name: req.params.name });

        if (!service) {
            return res.status(404).json({ message: "Service not found" });
        }

        res.json(service);

    } catch (err) {

        console.error(err);
        res.status(500).json({ error: "Failed to fetch service" });

    }

});


/* ADD NEW SERVICE */

router.post("/", async (req, res) => {

    try {

        const service = new Service(req.body);

        await service.save();

        res.json({ message: "Service added successfully" });

    } catch (err) {

        console.error(err);
        res.status(500).json({ error: "Failed to add service" });

    }

});


module.exports = router;
