const express = require("express");
const cors = require("cors");
const scrape = require("./scraper");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Add this route for root
app.get("/", (req, res) => {
  res.send("✅ NJS Tracker Scraper is live!");
});

// Tracking API
app.post("/track", async (req, res) => {
  const { courier, trackingId } = req.body;

  try {
    const result = await scrape(courier, trackingId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
