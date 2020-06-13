require('dotenv').config()
const { GraphQLServer } = require('graphql-yoga');

const typeDefs = `
  type Skill {
    name: String!
    rating: Int
  }

  type Link {
    title: String!
    url: String!
    type: String!
  }

  type About {
    text: String!
  }

  type Contact {
    email: String!
  }

  type Query {
    about: About
    technologies: [Skill]
    languages: [Skill]
    tools: [Skill]
    links: [Link]
    contact: Contact
  }
`;

const contact = {
  email: "mail@rin-raeuber.com",
};

const about = { text: "Welcome! This is a simple backend for http://work-with.rin-raeuber.com/ using GraphQL." };

const resolvers = {
  Query: {
    about: () => about,
    languages: () => require('./content/languages.json'),
    technologies: () => require('./content/technologies.json'),
    tools: () => require('./content/technologies.json'),
    links: () => require('./content/links.json'),
    contact: () => contact,
  },
};

const asciiArt = "#                 _            _ _   _      ___ _      \r\n# __ __ _____ _ _| |__ __ __ _(_) |_| |_   | _ (_)_ _  \r\n# \\ V  V \/ _ \\ \'_| \/ \/ \\ V  V \/ |  _| \' \\  |   \/ | \' \\ \r\n#  \\_\/\\_\/\\___\/_| |_\\_\\  \\_\/\\_\/|_|\\__|_||_| |_|_\\_|_||_|\r\n#\r\n";
const welcomeText = `# Welcome! 
# This is a simple GraphQL backend 
# for http://work-with.rin.li/ .
`;
const defaultPlaygroundQuery = 
`
query {
  languages {
    name
  }
  links {
    title
    url
  }
}
`;
const server = new GraphQLServer({ typeDefs, resolvers });
const options = {
  playground: '/',
  port: process.env.GRAPHQL_PORT,
  endpoint: process.env.API_ENDPOINT,
  defaultPlaygroundQuery: asciiArt + welcomeText + defaultPlaygroundQuery,
};

server.start(options, () => console.log('Server running on port ', process.env.GRAPHQL_PORT));
