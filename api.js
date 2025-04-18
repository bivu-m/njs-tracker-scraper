const express = require("express");
const cors = require("cors");
const scraper = require("./scraper");

const app = express();
const port = 3000;

// Enable CORS for all origins (you can adjust this to allow specific origins)
app.use(cors());

app.get("/api/track", async (req, res) => {
  const { courier, trackingId } = req.query;

  if (!courier || !trackingId) {
    return res.status(400).json({ error: "Missing courier or trackingId" });
  }

  // Example validation for India Post tracking ID (you can expand this)
  const validTrackingIdPattern = /^[A-Za-z0-9]+$/; // Adjust this regex based on tracking ID format
  if (!validTrackingIdPattern.test(trackingId)) {
    return res.status(400).json({ error: "Invalid trackingId format" });
  }

  try {
    // Scrape the tracking data from the scraper function
    const data = await scraper(courier, trackingId);

    // Check if data is empty (in case no tracking info is found)
    if (!data || data.length === 0) {
      return res.status(404).json({ status: "failed", error: "No tracking information found" });
    }

    res.json({ status: "success", data });
  } catch (err) {
    console.error(err);

    // Handle specific errors
    if (err.message.includes("Timeout")) {
      return res.status(504).json({ status: "failed", error: "Request timed out" });
    }

    res.status(500).json({ status: "failed", error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
