const express = require("express");
const scraper = require("./scraper");

const app = express();
const port = 3000;

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