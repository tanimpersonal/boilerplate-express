const express = require("express");
const toolsController = require("../../controllers/tools.controller.js");
const { limiter } = require("../../middleware/limiter.js");

const { viewCount } = require("../../middleware/viewCount.js");
const router = express.Router();
// /tools is already written in index file. so /tools is base route******
/*router.get("/:id", (req, res) => {
  res.send("Tools found with id");
});
router.post("/", (req, res) => {
  res.send("Tools ");
});*/
// shorthand for the above process
router
  .route("/:id")
  // here i will add api documentation for get req
  //middleware will insert with comma and that next() function will help to get to the next middleware call
  .get(limiter, viewCount, toolsController.getAllTools)
  // here api doc for post
  .post(toolsController.postTool);

module.exports = router;
