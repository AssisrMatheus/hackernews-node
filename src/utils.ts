import jwt from 'jsonwebtoken';
import { ContextType } from '.';

export const APP_SECRET = 'GraphQL-is-aw3some';

export const getUserId = (context: ContextType) => {
  const Authorization = context.request.get('Authorization');
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');
    const { userId } = jwt.verify(token, APP_SECRET);
    return userId;
  }

  throw new Error('Not authenticated');
};
