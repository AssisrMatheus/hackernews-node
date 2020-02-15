import { GraphQLServer } from 'graphql-yoga';
import { prisma } from './generated/prisma-client';

type ContextType = {
  prisma: typeof prisma;
};

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: (_root, _args, context: ContextType) => {
      return context.prisma.links();
    }
  },
  Mutation: {
    post: (_root, args, context: ContextType) => {
      return context.prisma.createLink({
        url: args.url,
        description: args.description
      });
    },
    updateLink: (_root, args, context: ContextType) => {
      return context.prisma.updateLink({
        data: {
          ...args,
          id: undefined
        },
        where: {
          id: args.id
        }
      });
    },
    deleteLink: (_root, args, context: ContextType) => {
      return context.prisma.deleteLink({ ...args });
    }
  }
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: { prisma }
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
