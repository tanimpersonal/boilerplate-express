const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
//middleware
const cors = require("cors");
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

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
    const orderCollection = client.db("assignment-12").collection("orders");
    const testimonialCollection = client
      .db("assignment-12")
      .collection("testimonials");
    //get tools
    app.get("/tools", async (req, res) => {
      const query = {};
      const result = toolCollection.find(query);
      const tools = await result.toArray();
      res.send(tools);
    });
    app.get("/tools/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const tool = await toolCollection.findOne(query);
      res.send(tool);
      console.log(id);
    });
    app.put("/tools/:id", async (req, res) => {
      const id = req.params.id;
      const body = req.body.available_quantity;
      const query = { _id: ObjectId(id) };
      const options = { upsert: true };

      const update = {
        $set: {
          available_quantity: body,
        },
      };
      const result = await toolCollection.updateOne(query, update, options);
      res.send(result);
      console.log(id, body);
    });
    app.post("/orders", async (req, res) => {
      const order = req.body;
      console.log(order);
      const result = await orderCollection.insertOne(order);
      res.send(result);
    });
    app.get("/orders", async (req, res) => {
      const query = {};
      const result = orderCollection.find(query);
      const orders = await result.toArray();
      res.send(orders);
    });
    app.get("/orders/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email };
      const result = await orderCollection.find(query).toArray();
      res.send(result);
    });
    app.get("/testimonials", async (req, res) => {
      const query = {};
      const result = await testimonialCollection.find(query).toArray();
      res.send(result);
    });
    app.post("/testimonials", async (req, res) => {
      console.log(req.body);
      const review = req.body;
      const result = await testimonialCollection.insertOne(review);
      res.send(result);
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
