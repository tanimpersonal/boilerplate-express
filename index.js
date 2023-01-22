let ejs = require("ejs");
const express = require("express");
const app = express();
const dbConnect = require("./utils/dbConnect");
const toolsRoute = require("./routes/v1/tools.route.js");
require("dotenv").config();
const port = process.env.PORT || 5000;
//middleware
const cors = require("cors");
const { viewCount } = require("./middleware/viewCount");
const { rateLimit } = require("express-rate-limit");
const { errorHandler } = require("./middleware/errorHandler");
app.use(cors());
app.use(express.json());
// can view files staticly
app.use(express.static("public"));

dbConnect();
//application level
app.use("/api/v1/tools", toolsRoute);

let id = 1;
app.get("/", (req, res) => {
  res.send("Hello World!");
  ejs.render("jj.ejs", { id: id });
});

// if no route matches
app.all("*", (req, res) => {
  res.status(400).send({
    status: 0,
    error: "No routes found",
  });
});

//global error handler
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

//if error can not be handled by express itself then another handler
process.on("unhandledRejection", (error) => {
  console.log(error.name, error.message);
  app.close(() => {
    process.exit(1);
  });
});
