import { ContextType } from '../index';

export const feed = (_root, _args, context: ContextType) => {
  return context.prisma.links();
};
