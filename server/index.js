const express = require("express")
const colors = require("colors")
require("dotenv").config()
const { graphqlHTTP } = require("express-graphql")
const schema = require("./schema/schema")
const connectDB = require("./config/db")
const app = express()

//connect to DB
connectDB()

app.use(
  "/graphql",
  graphqlHTTP({
    //schema: require("./schema/schema"),
    schema,
    graphiql: process.env.NODE_ENV === "development",
  })
)

app.listen(process.env.PORT, () =>
  console.log(`GraphQL Server Up and Running on port ${process.env.PORT}`)
)
