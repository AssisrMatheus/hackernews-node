import { ContextType } from '../index';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { APP_SECRET, getUserId } from '../utils';

export const signup = async (_parent, args, context: ContextType) => {
  const password = await bcrypt.hash(args.password, 10);
  const user = await context.prisma.createUser({ ...args, password });
  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user
  };
};

export const login = async (_parent, args, context: ContextType) => {
  const user = await context.prisma.user({ email: args.email });
  if (!user) {
    throw new Error('No such user found');
  }

  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    throw new Error('Invalid password');
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user
  };
};

export const post = (_parent, args, context: ContextType) => {
  const userId = getUserId(context);
  return context.prisma.createLink({
    url: args.url,
    description: args.description,
    postedBy: { connect: { id: userId } }
  });
};

export const updateLink = (_root, args, context: ContextType) => {
  return context.prisma.updateLink({
    data: {
      ...args,
      id: undefined
    },
    where: {
      id: args.id
    }
  });
};

export const deleteLink = (_root, args, context: ContextType) => {
  return context.prisma.deleteLink({ ...args });
};
