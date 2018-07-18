const express = require('express');
const express_graphql = require('express-graphql');
const { buildSchema } = require('graphql');
const cors= require('cors');

//pg connection details
const pgPromise = require('pg-promise');
 // add your Postgresql connection string details
const connStr ='postgres://imrlsisb:mpJx2ZCqroGCcKmJGY_j_KddOTgiKyka@stampy.db.elephantsql.com:5432/imrlsisb';
const pgp = pgPromise({}); // empty pgPromise instance
const psql = pgp(connStr); // get connection to your PG db instance

// GraphQL schema to define the operations with types of data elements involved
const schema = buildSchema(`
    type Query {
              allEmployees: [Employee]
      employee(employee_id: Int!): Employee
  },
  type Employee {
      employee_id: Int
      firstname: String
      lastname: String
  }
`);
// type Query {
//     firstname: String,
//     lastname: String
// }
// Resolver logic to respond to the query
// var root = {
//       firstname: () => 'Walking',
//       lastname: () => 'Tree'
//     };
 //Resolver logic to respond to the query from db
const root=  {
  employee :  async ({ employee_id }) => {
           // console.log(employee_id);
           const empQuery = 'select employee_id, firstname, lastname from wtt.employee where employee_id='+employee_id ;
           return psql.oneOrNone(empQuery);//using pgsql connection to get data
      //           return null;
       },
    allEmployees :  async (parent, args, ctx) => {
             const empQuery = 'select employee_id, firstname, lastname from wtt.employee';
             return psql.manyOrNone(empQuery);//using pgsql connection to get data
        //           return null;
         },
    };

// Create an express server and a GraphQL endpoint
const app = express().use('*', cors());//cors included to enable CORS requests
// console.log(schema);
// console.log(root);
app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));
app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));
