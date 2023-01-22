const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const dbConnect = () => {
  const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.755op.mongodb.net/?retryWrites=true&w=majority`;
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });
};
module.exports = dbConnect;
