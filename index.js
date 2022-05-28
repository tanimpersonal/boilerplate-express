const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
//middleware
const cors = require("cors");
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://dbuser1:89NuSGyMNpr6nn4o@cluster0.755op.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  try {
    await client.connect();
    const toolCollection = client.db("assignment-12").collection("tools");

    app.get("/tools", async (req, res) => {
      const query = {};
      const result = toolCollection.find(query);
      const tools = await result.toArray();
      res.send(tools);
    });
  } finally {
    // await client.close();
  }
}
run();
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
