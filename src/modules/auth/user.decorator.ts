import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';

export const GetUser = createParamDecorator(
  (_: any, ctx: ExecutionContext) => {
    const response = ctx.switchToHttp().getResponse();

    if (!response.locals.user) throw new UnauthorizedException('Could not identify user');
    return response.locals.user;
  },
);
