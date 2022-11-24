import { gql } from "apollo-server-express";

const typeDefs = gql`

    type User {
        _id: ID
        name: String
        email: String
        password: String
    }

    type Query {
        hello: String
    }
`

export default typeDefs;