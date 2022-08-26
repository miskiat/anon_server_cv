const { doSignup } = require("./auth.service");

const router = require("express").Router();

router.post("/singup", doSignup);

module.exports = router;
