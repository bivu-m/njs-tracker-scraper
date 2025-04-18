const express = require("express");
const cors = require("cors");
const scrape = require("./scraper");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("✅ NJS Tracker Scraper is live!");
});

app.post("/track", async (req, res) => {
  const { courier, trackingId } = req.body;

  try {
    console.log(`Received request for courier: ${courier}, trackingId: ${trackingId}`);
    const result = await scrape(courier, trackingId);
    console.log("Scraping successful:", result);
    res.json(result);
  } catch (error) {
    console.error("Error during scraping:", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
