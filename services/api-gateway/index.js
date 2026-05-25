const cors = require("cors");
const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

app.use(cors());

// ✅ AUTH SERVICE
app.use(
  "/signup",
  createProxyMiddleware({
    target: "http://auth-service:4000",
    changeOrigin: true,
  })
);

app.use(
  "/login",
  createProxyMiddleware({
    target: "http://auth-service:4000",
    changeOrigin: true,
  })
);

// ✅ OPTIONAL (if you want /auth/signup style also)
app.use(
  "/auth",
  createProxyMiddleware({
    target: "http://auth-service:4000",
    changeOrigin: true,
    pathRewrite: {
      "^/auth": "",
    },
  })
);

// ✅ USER SERVICE (future use)
app.use(
  "/user",
  createProxyMiddleware({
    target: "http://user-service:4001", // NOT localhost ❗
    changeOrigin: true,
  })
);

// ✅ PORTFOLIO SERVICE (future use)
app.use(
  "/portfolio",
  createProxyMiddleware({
    target: "http://portfolio-service:4003", // NOT localhost ❗
    changeOrigin: true,
  })
);

// ✅ TEST ROUTE
app.get("/", (req, res) => {
  res.send("API Gateway Running ✅");
});

// ✅ START SERVER
app.listen(3001, () => {
  console.log("API Gateway running on port 3001 🚀"); //test push
});
