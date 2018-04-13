const express = require('express');
const expressGraphql = require('express-graphql');
const { buildSchema } = require('graphql');
// GraphQL schema
const schema = buildSchema(`
    type Query {
        message: String
    }
`);
// Root resolver
const root = {
  message: () => 'Hello World!'
};
// Create an express server and a GraphQL endpoint
const app = express();
app.use('/graphql', expressGraphql({
  schema,
  rootValue: root,
  graphiql: true
}));
app.listen(9000, () => console.log('Express GraphQL Server Now Running On localhost:9000/graphql'));
