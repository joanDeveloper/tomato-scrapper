require('dotenv').config();
import { createServer } from 'http'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import { typeDefs } from './models/schema'
import { Query } from './resolvers/query'
import { Mutation } from './resolvers/mutation'
import { Broker } from './utils/broker.utils'

(async () => {
    const broker = await Broker.get()
    if(broker.started) broker.logger.info("😄 broker is started!! ")
    else {
        broker.logger.error("❌❌😟❌❌ broker is not started!! ")
        // turn again (loop promise)
    }
    
    const app = express();
    const httpServer = createServer(app);
    const resolvers = { Query, Mutation };
    const schema = makeExecutableSchema({ typeDefs, resolvers });

    const server = new ApolloServer({
        schema,
        formatError: (err) => {
            console.log("ERROR FORMATTTER", err);
            return err
        },
        context: async (req: any) => {
            return {
                ...req,
                broker: broker
            }
        },
        plugins: [
            ApolloServerPluginLandingPageGraphQLPlayground({
                settings: {
                    "editor.theme": "dark",
                    "request.credentials": "include",
                    "editor.fontSize": 14,
                    "schema.polling.interval": 60000, //1 minute
                    "schema.polling.enable": true
                },
            }),
        ],
    });
    await server.start();
    server.applyMiddleware({ app });

    httpServer.listen(process.env.PORT_GQL, () => {
        broker.logger.info(`🤖 server ready at http://localhost:${process.env.PORT_GQL}${server.graphqlPath}`)
    });
})();