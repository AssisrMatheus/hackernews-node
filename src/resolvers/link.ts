import { ContextType } from '../index';

export const postedBy = (parent, _args, context: ContextType) => {
  return context.prisma.link({ id: parent.id }).postedBy();
};
