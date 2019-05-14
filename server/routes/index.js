const router = require("express").Router();
const User = require("../model/user");
var HttpStatus = require("http-status-codes");
const action = require("../static/enums");

router.post("/register", (req, res) => {
  User.create(req.body, (err, user) => {
    if (err) return res.status(HttpStatus.NOT_FOUND).json(err);
    return res
      .staus(HttpStatus.OK)
      .json({ message: action.USER_CREATED, user });
  });
});

router.patch("/update/:email/:name", async (req, res) => {
  const { params: email, params: name } = req;
  const doc = await User.findOne({ email });
  doc.name = name;
  await doc.save();
  return res.status(HttpStatus.OK).json({ message: action.USER_UPDATED });
});

router.get("/search/:name", function(req, res) {
  const { params: name } = req;
  User.search({ query_string: { query: name } }, (err, results) => {
    return res.status(HttpStatus.OK).json(results);
  });
});

module.exports = router;
