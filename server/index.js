const express = require("express");
const cors = require("cors");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const axios = require("axios");

const app = express();

async function startServer() {
    const server = new ApolloServer({
        typeDefs: `
        type User{
                id: ID!
                name: String!
                username: String!
                email: String!
                website: String!
            }
            type Todo {
                id: ID!
                title: String!
                completed: Boolean
                user: User
            }
            type Query {
                getTodos: [Todo]
                getAllUsers: [User]
                getUser(id: ID!): User
            }
               
        `,
        resolvers: {
            Todo: {
                user: async (todo) => (await axios.get(`https://jsonplaceholder.typicode.com/users/${todo.id}`)).data
            },
            Query: {
                getTodos: async () => (await axios.get("https://jsonplaceholder.typicode.com/todos")).data,
                getAllUsers: async () => (await axios.get("https://jsonplaceholder.typicode.com/users")).data,
                getUser: async (parent, { id }) => (await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)).data
            }
        }
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
