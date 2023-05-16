const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://sayfmab:76rZ1pL0O3qqsClt@cluster0.lo1qtlw.mongodb.net/shop?retryWrites=true&w=majority";

let db;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  await client.connect();
  db = client.db();
}

const getDb = () => {
  if (db) return db;
};

module.exports = { run, getDb };
