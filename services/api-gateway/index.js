const cors = require("cors");
const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

// Auth Service
app.use(
  "/auth",
  createProxyMiddleware({
    target: "http://localhost:4000",
    changeOrigin: true,
    pathRewrite: {
      "^/auth": ""
    }
  })
);

// User Service ✅
app.use(
  "/user",
  createProxyMiddleware({
    target: "http://localhost:4001",
    changeOrigin: true
  })
);

// Test route
app.use(cors());
app.get("/", (req, res) => {
  res.send("API Gateway Running ✅");
});

app.listen(3001, () => {
  console.log("API Gateway running on port 3001 🚀");
});
// Portfolio Service
app.use(
  "/portfolio",
  createProxyMiddleware({
    target: "http://localhost:4003",
    changeOrigin: true
  })
);