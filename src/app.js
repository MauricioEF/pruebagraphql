import express from 'express'
import usersRouter from './routes/users.router.js';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';
import __dirname from './utils.js';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './graphql/typeDefs.js';
import resolvers from './graphql/resolvers.js';

const app = express();
const swaggerOptions = {
    definition:{
        openapi:'3.0.1',
        info: {
            title: "API feliz de Coder",
            description: "API pensada para la clase de Swagger"
        }
    },
    apis:[`${__dirname}/docs/**/*.yaml`]
}

const specs = swaggerJsdoc(swaggerOptions);

app.use(express.json());

app.use('/apidocs',swaggerUiExpress.serve,swaggerUiExpress.setup(specs))
app.use('/api/users',usersRouter);

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers
})
await apolloServer.start();
apolloServer.applyMiddleware({app})


const server = app.listen(8080,()=>console.log("Listening"))