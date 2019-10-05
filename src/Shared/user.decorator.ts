import { createParamDecorator } from '@nestjs/common';

/* A custom User decorator for getting User Response */
export const User = createParamDecorator((data, req) => {
  return data ? req.user[data] : req.user;
});
