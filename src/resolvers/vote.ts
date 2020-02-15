export const link = (parent, _args, context) => {
  return context.prisma.vote({ id: parent.id }).link();
};

export const user = (parent, _args, context) => {
  return context.prisma.vote({ id: parent.id }).user();
};
