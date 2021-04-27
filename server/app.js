const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema/schema')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express();

//allow cross-origin requests
app.use(cors());

//connect to mlab database(mongodb atlas for new version)
mongoose.connect('mongodb+srv://lxr:test123@gql-ninja.a9u8c.mongodb.net/<dbname>?retryWrites=true&w=majority')
//once is a event listener
mongoose.connection.once('open', ()=>{
    console.log("connected to database");
})

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql:true
}));

app.listen(4000, () => {
    console.log('now listening for requests on port 4000')
});


