/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config()
const { GraphQLServer } = require('graphql-yoga');

const contact = { email: "mail@rin-raeuber.com" };
const about = { text: "Welcome! This is a simple backend for http://work-with.rin-raeuber.com/ using GraphQL." };
const welcomeText = require('./welcomeText.ts');
const defaultPlaygroundQuery = require('./defaultQuery.ts');

const resolvers = {
  Query: {
    about: () => about,
    languages: () => require('./content/languages.json'),
    technologies: () => require('./content/technologies.json'),
    tools: () => require('./content/tools.json'),
    links: () => require('./content/links.json'),
    interests: () => require('./content/interests.json'),
    experience: () => require('./content/experience.json'),
    hours: () => require('./content/hours.json'),
    contact: () => contact,
  },
};

const server = new GraphQLServer({ typeDefs: './src/schema.graphql', resolvers });
const options = {
  playground: '/',
  port: process.env.PORT,
  endpoint: process.env.API_ENDPOINT,
  defaultPlaygroundQuery: welcomeText + defaultPlaygroundQuery,
};

server.start(options, () => 
  console.log(`✨ Server running ✨\n at port ${process.env.PORT || 4000}`));
