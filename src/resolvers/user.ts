import { ContextType } from '../index';

export const links = (parent, _args, context: ContextType) => {
  return context.prisma.user({ id: parent.id }).links();
};
