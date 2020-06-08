const { GraphQLServer } = require('graphql-yoga')

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

  type Query {
    skills: [Skill]
    links: [Link]
  }
`

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

const resolvers = {
  Query: {
    skills: () => skills,
    links: () => links,
  },
};

const server = new GraphQLServer({ typeDefs, resolvers });
const options = {
  playground: '/',
  endpoint: '/api',
  defaultPlaygroundQuery: 
  `query {
    skills {
      name
    }
    links {
      title
      url
    }
  }`
};

server.start(options, () => console.log('Server is running on localhost:4000'));