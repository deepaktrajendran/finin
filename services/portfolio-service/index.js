require("dotenv").config();

const express = require("express");
const { Pool } = require("pg");

const app = express();
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DB_URL,
});

// Buy stock
app.post("/buy", async (req, res) => {
  try {
    const { user_id, stock, quantity, price } = req.body;

    await pool.query(
      "INSERT INTO portfolio (user_id, stock, quantity, price) VALUES ($1, $2, $3, $4)",
      [user_id, stock, quantity, price]
    );

    res.send("Stock purchased ✅");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error buying stock");
  }
});

// Get portfolio
app.get("/:user_id", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM portfolio WHERE user_id=$1",
      [req.params.user_id]
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching portfolio");
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Portfolio Service running on port ${process.env.PORT} 🚀`);
});