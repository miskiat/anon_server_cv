const router = require("express").Router();
const authRoutes = require("./auth/auth.routes");

router.use("/auth", authRoutes);

router.get("*", (req, res) => {
  res.json({
    message: "Welcome to the beginning of nothingness 💻🚀",
  });
});

module.exports = router;
