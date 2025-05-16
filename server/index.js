const express = require("express");
const cors = require("cors");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");

const app = express();

async function startServer() {
    const server = new ApolloServer({
        typeDefs: `
            type Todo {
                id: ID!
                title: String!
                completed: Boolean
            }
            type Query {
                getTodos: [Todo]
            }
        `,
    });

    await server.start();

    app.use(cors());

    app.use("/graphql", express.json(), expressMiddleware(server));

    app.get("/", (req, res) => {
        res.send("Welcome! Visit /graphql to use GraphQL.");
    });

    app.listen(8000, () => {
        console.log("🚀 Server running at http://localhost:8000/graphql");
    });
}

startServer();
