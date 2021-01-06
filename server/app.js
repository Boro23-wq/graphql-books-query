const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// allow cross origin requests
app.use(cors());

// DB connection
const dbURI =
  'mongodb+srv://23Boro:Zeej2VwElxRFljn0@cluster0.eutdg.gcp.mongodb.net/gql-books?retryWrites=true&w=majority';
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => app.listen(3000))
  .then(console.log('MongoDB Connected!'))
  .catch((err) => console.log(err));

// bind express with graphql
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log('Now listening for requests on port 4000!');
});
