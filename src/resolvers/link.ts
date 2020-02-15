import { ContextType } from '../index';

export const postedBy = (parent, _args, context: ContextType) => {
  return context.prisma.link({ id: parent.id }).postedBy();
};

export const votes = (parent, _args, context) => {
  return context.prisma.link({ id: parent.id }).votes();
};
