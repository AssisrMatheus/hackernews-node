import { GraphQLServer } from 'graphql-yoga';

let links = [
  {
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
  }
];

let idCount = links.length;

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links
  },
  Mutation: {
    post: (parent: any, args: any) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url
      };
      links.push(link);
      return link;
    },
    updateLink: (parent: any, args: any) => {
      const index = links.findIndex(x => x.id === args.id);
      links[index] = {
        ...links[index],
        ...args
      };
      return links[index];
    },
    deleteLink: (parent: any, args: any) => {
      const link = links.find(x => x.id === args.id);
      links = links.filter(x => x.id !== args.id);
      return link;
    }
  }
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
