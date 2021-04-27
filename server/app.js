const express = require("express");
const {graphqlHTTP} = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

//allow cross-origin requests
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).send("hello reading list");
});

//connect to mlab database(mongodb atlas for new version)
mongoose.connect(
  "mongodb+srv://lxr:test123@cluster0.a9u8c.mongodb.net/gql?retryWrites=true&w=majority"
);
//once is a event listener
mongoose.connection.once("open", () => {
  console.log("connected to database");
});

const PORT = process.env.PORT || 4000;

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(PORT, () => {
  console.log("now listening for requests on port 4000");
});
