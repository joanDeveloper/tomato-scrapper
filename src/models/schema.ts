import { gql } from 'apollo-server-express'

export const typeDefs = gql`
    type Query {
        readUser(data: String!): Response
    }

    type Mutation {
        verifyToken(data: String!): Response
    }
    
    type Response {
        msg: String
    }
`;