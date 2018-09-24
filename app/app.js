const hapi = require('hapi');
const hapiSwagger = require('hapi-swagger');
const { graphqlHapi, graphiqlHapi } = require('apollo-server-hapi');
const mongoose = require('mongoose');
const PrettyError = require('pretty-error');
const Inert = require('inert');
const Vision = require('vision');

const Posts = require('./controllers/posts');
const schema = require('./graphql/schemas/posts-schema');
const pkg = require('./package');
const settings = require("./config/settings").constants;

// Pretty errors
const prettyError = new PrettyError();
prettyError.start();



const init = async () => {
  await server.register([
    Inert,
    Vision,
    {
      plugin: hapiSwagger,
      options: {
        info: {
          title: 'Posts API Documentation',
          version: pkg.version
        },
      }
    }
  ]);
  await server.register({
    plugin: graphiqlHapi,
    options: {
      path: '/graphiql',
      graphiqlOptions: {
        endpointURL: '/graphql'
      },
      route: {
        cors: true
      }
    }
  });
  await server.register({
    plugin: graphqlHapi,
    options: {
      path: '/graphql',
      graphqlOptions: {
        schema
      },
      route: {
        cors: true
      }
    }
  });
  server.route(Posts);
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};


const server = hapi.server({
  port: settings.SERVICES_PORT,
  host: 'localhost'
});

mongoose.connect('mongodb://jones:007jones@ds111623.mlab.com:11623/cupcake', { useNewUrlParser: true });
mongoose.connection.once('open', () => console.log('connected to database'));

process.on('unHandledRejection', (err) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
});

init();