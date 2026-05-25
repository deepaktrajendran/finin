require("dotenv").config();

const cors = require("cors");
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Pool } = require("pg");
const Redis = require("ioredis");

const app = express();
app.use(express.json());
app.use(cors());

// ✅ ✅ FIXED REDIS CONNECTION
const redis = new Redis({
  host: process.env.REDIS_HOST || "redis-service",
  port: process.env.REDIS_PORT || 6379,
});

redis.on("connect", () => {
  console.log("✅ Connected to Redis");
});

redis.on("error", (err) => {
  console.error("❌ Redis Error:", err);
});

// ✅ DATABASE CONNECTION
const pool = new Pool({
  connectionString: process.env.DB_URL,
});

// ✅ Test route
app.get("/", (req, res) => {
  res.send("Auth Service Running ✅");
});

// ✅ Signup API
app.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    const hash = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO users (email, password) VALUES ($1, $2)",
      [email, hash]
    );

    // ✅ Publish event to Redis
    await redis.publish(
      "user-events",
      `New user signed up: ${email}`
    );

    res.send("User created ✅");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating user");
  }
});

// ✅ Login API
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    if (user.rows.length === 0) {
      return res.status(401).send("User not found");
    }

    const isValid = await bcrypt.compare(
      password,
      user.rows[0].password
    );

    if (!isValid) {
      return res.status(401).send("Invalid password");
    }

    const token = jwt.sign(
      { userId: user.rows[0].id },
      process.env.JWT_SECRET || "secret"
    );

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).send("Login error");
  }
});

// ✅ Start server
app.listen(4000, () => {
  console.log("Auth Service running on port 4000 🚀");
});