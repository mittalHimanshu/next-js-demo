const router = require("express").Router();

router.get("/test", (req, res) => {
  return res.end("hello test route");
});

module.exports = router;
