// Import essential libraries
const express = require("express");
var cors = require("cors");
const app = express();
/* const path = require("path"); */
const router = express.Router();

const db = require("./firebase_admin");

const ref = db.ref("example");
app.use(express.json()); // Parse JSON request bodies

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

/* ar allowlist = ["http://localhost", "localhost"];
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (allowlist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
}; */

// Replace the placeholder with your Atlas connection string
const uri =
  "mongodb+srv://techzasha:ridYVCRZnC5FUDr1@dharti.ctgvhra.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const mclient = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// async function run() {
//   try {
//     // Connect the client to the server (optional starting in v4.7)
//     await mclient.connect();

//     // Send a ping to confirm a successful connection
//     await mclient.db("Thesmo").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//     // Fetch data from the "Lottery" collection
//     const lotteryCollection = mclient.db("Thesmo").collection("Crates");
//     const lotteryData = await lotteryCollection.find({}).toArray();
//     console.log("Lottery Data:", lotteryData);

//     const lotteryDataToInsert = { owner: "Piper", value: 300, isGame: true };
//     const lotteryInsertResult = await lotteryCollection.insertOne(lotteryDataToInsert);
//     console.log("Inserted Lottery Data:", lotteryInsertResult);

//   } finally {
//     // Ensures that the client will close when you finish/error
//     await mclient.close();
//   }
// }
// run().catch(console.dir);


app.post("/createcrate", cors(), async (req, resp) => {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await mclient.connect();

    // Send a ping to confirm a successful connection
    await mclient.db("Thesmo").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
    // Fetch data from the "Lottery" collection
    const lotteryCollection = mclient.db("Thesmo").collection("Crates");
    const lotteryData = await lotteryCollection.find({}).toArray();
    console.log("Lottery Data:", lotteryData);

    const lotteryDataToInsert = {
      owner: "Piper",
      value: 300,
      isGame: true,
      type: "sapphire",
      date: Date.now(),
    };
    const lotteryInsertResult = await lotteryCollection.insertOne(
      lotteryDataToInsert
    );
    console.log("Inserted Lottery Data:", lotteryInsertResult);
    resp.json(lotteryInsertResult);
  } catch (error) {
    resp.json(error);
  }
});

app.get("/getallcrates", cors(), async (req, resp) => {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await mclient.connect();

    // Send a ping to confirm a successful connection
    await mclient.db("Thesmo").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
    // Fetch data from the "Lottery" collection
    const lotteryCollection = mclient.db("Thesmo").collection("Crates");
    const lotteryData = await lotteryCollection.find({}).toArray();
    console.log("Lottery Data:", lotteryData);
    resp.json(lotteryData);
    mclient.close();
  } catch (error) {
    resp.json(error);
  }

  // } finally {
  //   // Ensures that the client will close when you finish/error
  //   // await mclient.close();
  // }
});

app.get("/getusers", cors(), async (req, resp) => {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await mclient.connect();

    // Send a ping to confirm a successful connection
    await mclient.db("Thesmo").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
    // Fetch data from the "Lottery" collection
    const Collection = mclient.db("Thesmo").collection("Users");
    const lotteryData = await Collection.find({}).toArray();
    console.log("Lottery Data:", lotteryData);
    resp.json(lotteryData);
    mclient.close();
  } catch (error) {
    resp.json(error);
  }

  // } finally {
  //   // Ensures that the client will close when you finish/error
  //   // await mclient.close();
  // }
});

app.post("/signup", cors(), async (req, resp) => {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await mclient.connect();

    // Send a ping to confirm a successful connection
    await mclient.db("Thesmo").command({ ping: 1 });
    const Collection = mclient.db("Thesmo").collection("Users");
    console.log("Received request:", req.body); // Logging the request body
    const user = await Collection.findOne({ nickname: req.body.nickname });
    const email = await Collection.findOne({ email: req.body.email });

    if (user) {
      resp.json("User Exist");
    } else {
      if (email) {
        resp.json("Email Exist");
      } else {
        resp.json("Create");
        const newUser = {
          nickname: req.body.nickname,
          password: req.body.password,
          email: req.body.email,
          wallet: req.body.wallet,
          points: 0,
        };
        const result = await Collection.insertOne(newUser);
      }
    }
  } catch (error) {
    resp.json(error);
  }
});

app.post("/login", cors(), async (req, resp) => {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await mclient.connect();

    // Send a ping to confirm a successful connection
    await mclient.db("Thesmo").command({ ping: 1 });
    const Collection = mclient.db("Thesmo").collection("Users");
    console.log("Received request:", req.body); // Logging the request body
    const user = await Collection.findOne({ nickname: req.body.nickname });
    if (user) {
      if (user.password === req.body.password) {
        resp.json(user);
      } else {
        resp.json("pass wrong");
      }
    } else {
      resp.json("User dont exist");
    }
  } catch (error) {
    resp.json(error);
  }
});

app.put("/updatepoints", cors(), async (req, resp) => {
  try {
    await mclient.connect();
    const collection = mclient.db("Thesmo").collection("Users");
    const { id, newValue } = req.body;
    console.log(newValue)

    const result = await collection.updateOne(
      { "_id": new ObjectId(id) },
      { $set: { "points": newValue } }
    );

    resp.json(result);
  } catch (error) {
    resp.json(error);
  } finally {
    await mclient.close();
  }
});

//add the router
app.use(cors());
app.use("/", router);

app.get("/", (req, res) => {
  res.send("Bienvenido/a al inicio");
})

let puerto = process.env.PORT || 3000;

app.listen(puerto, () => console.log("Servidor corriendo en puerto 3000"));