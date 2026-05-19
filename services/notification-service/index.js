require("dotenv").config();

const express = require("express");
const Redis = require("ioredis");

const app = express();
app.use(express.json());

const redis = new Redis(process.env.REDIS_URL);

// Subscribe to events
redis.subscribe("user-events", (err) => {
  if (err) {
    console.error("Failed to subscribe:", err);
  } else {
    console.log("Subscribed to user-events ✅");
  }
});

// Listen to events
redis.on("message", (channel, message) => {
  console.log(`📢 Notification received: ${message}`);
});

// Test endpoint
app.get("/", (req, res) => {
  res.send("Notification Service Running ✅");
});

app.listen(process.env.PORT, () => {
  console.log(`Notification Service running on port ${process.env.PORT} 🚀`);
});