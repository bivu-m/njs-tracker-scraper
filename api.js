const express = require("express");
const cors = require("cors");  // <-- Import CORS
const scraper = require("./scraper");

const app = express();
const port = 3000;

// Enable CORS for all origins (you can customize this if needed)
app.use(cors());

app.get("/api/track", async (req, res) => {
  const { courier, trackingId } = req.query;
  if (!courier || !trackingId) return res.status(400).json({ error: "Missing courier or trackingId" });

  try {
    const data = await scraper(courier, trackingId);
    res.json({ status: "success", data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "failed", error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
