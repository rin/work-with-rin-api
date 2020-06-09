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

  type Query {
    about: About
    skills: [Skill]
    links: [Link]
  }
`;


const skills = [
  { name: 'React.js', rating: 87 },
  { name: 'Next.js', rating: 62 },
  { name: 'GraphQL', rating: 47 },
];

const links = [
  { title: 'github', url: 'http://github.com/rin', type: 'external' },
  { title: 'LinkedIn', url: 'http://linkedin.com/in/rinraeuber', type: 'external' },
  { title: "Rin's CV", url: 'http://rinscv.de/bla.pdf', type: 'download' },
];

const about = { text: "Welcome! This is a simple backend for http://work-with.rin-raeuber.com/ using GraphQL." };

const resolvers = {
  Query: {
    about: () => about,
    skills: () => skills,
    links: () => links,
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
  skills {
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
  endpoint: '/api',
  defaultPlaygroundQuery: asciiArt + welcomeText + defaultPlaygroundQuery,
};

server.start(options, () => console.log('Server running on port 4000'));