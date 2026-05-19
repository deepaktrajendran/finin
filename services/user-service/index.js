require("dotenv").config();

const express = require("express");
const { Pool } = require("pg");

const app = express();
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DB_URL,
});

// Get user by id
app.get("/:id", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, email FROM users WHERE id=$1",
      [req.params.id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching user");
  }
});

// Update user email
app.put("/:id", async (req, res) => {
  try {
    const { email } = req.body;

    await pool.query(
      "UPDATE users SET email=$1 WHERE id=$2",
      [email, req.params.id]
    );

    res.send("User updated ✅");
  } catch (err) {
    console.error(err);
    res.status(500).send("Update failed");
  }
});

// start server
app.listen(process.env.PORT, () => {
  console.log(`User Service running on port ${process.env.PORT} 🚀`);
});