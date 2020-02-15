/* eslint-disable @typescript-eslint/camelcase */
import { ContextType } from '../index';

export const newLink = {
  subscribe: (_parent, _args, context: ContextType) => {
    return context.prisma.$subscribe.link({ mutation_in: ['CREATED'] }).node();
  },
  resolve: payload => {
    return payload;
  }
};

export const newVote = {
  subscribe: (_parent, _args, context) => {
    return context.prisma.$subscribe.vote({ mutation_in: ['CREATED'] }).node();
  },
  resolve: payload => {
    return payload;
  }
};
