import { GraphQLServer } from 'graphql-yoga';
import { prisma } from './generated/prisma-client';
import { ContextParameters } from 'graphql-yoga/dist/types';
import * as Query from './resolvers/query';
import * as Mutation from './resolvers/mutation';
import * as Subscription from './resolvers/subscription';
import * as Link from './resolvers/link';
import * as User from './resolvers/user';
import * as Vote from './resolvers/vote';

export type ContextType = {
  prisma: typeof prisma;
} & ContextParameters;

const resolvers = {
  Query,
  Mutation,
  Subscription,
  Link,
  User,
  Vote
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: request => {
    return {
      ...request,
      prisma
    };
  }
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
