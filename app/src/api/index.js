const express = require("express");
const router = express.Router();

router.get("/ping", (req, res) => {
  res.send({
    result: "pong"
  })
})


module.exports = router;
