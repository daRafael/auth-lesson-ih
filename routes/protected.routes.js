const router = require("express").Router();

router.get("/", (req, res) => {
  const { payload } = req;
  res.send(payload);
});

module.exports = router;