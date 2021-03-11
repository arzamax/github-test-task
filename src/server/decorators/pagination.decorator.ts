import { Request } from 'express';
import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export class PaginationModel {
  page!: number;
  take!: number;
}

export const Pagination = createParamDecorator<
  string,
  ExecutionContext,
  PaginationModel
>((data, context) => {
  const req = context.switchToHttp().getRequest<Request>();

  return {
    page: Number(req.query?.page ?? 1),
    take: Number(req.query?.take ?? 10),
  };
});
