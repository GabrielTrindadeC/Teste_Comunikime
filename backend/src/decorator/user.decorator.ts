import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const UserInfo = createParamDecorator(
  (_: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.info;
  },
);
