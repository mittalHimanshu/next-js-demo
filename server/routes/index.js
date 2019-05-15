const router = require("express").Router();
const User = require("../model/user");
const Story = require("../model/story");
var HttpStatus = require("http-status-codes");
const action = require("../static/enums");

router.post("/register", (req, res) => {
  User.create(req.body, (err, user) => {
    if (err) return res.status(HttpStatus.NOT_FOUND).json(err);
    return res
      .status(HttpStatus.OK)
      .json({ message: action.USER_CREATED, user });
  });
});

router.post("/save-post/:email", async (req, res) => {
  const { email } = req.params;
  const { story } = req.body;
  const { id } = await User.findOne({ email });
  console.log(id);
  story.author = id;
  const story_ = new Story(story);
  story_.save();
  User.updateOne(
    { id },
    {
      $set: {
        stories: story_.id
      }
    }
  ).then(user => {
    return res.status(HttpStatus.OK).json({ message: action.POST_SAVED });
  });
});

router.get("/get-post/:email", (req, res) => {
  const { email } = req.params;
  User.findOne({ email })
    .select("stories")
    .populate("stories")
    .exec()
    .then(user => {
      return res.status(HttpStatus.OK).json({ user });
    });
});

router.get("/search/:name", (req, res) => {
  const { params: name } = req;
  console.log(name);
  User.search({ query_string: { query: name } }, (err, results) => {
    return res.status(HttpStatus.OK).json(results);
  });
});

module.exports = router;
