import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request } from 'express';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<Request>();
    const method = request.method;
    const url = request.url;
    const body = request.body as Record<string, unknown>;
    const headers = request.headers;
    const ip = request.ip;
    const userAgent = headers['user-agent'] || 'unknown';
    const timestamp = new Date().toISOString();

    this.logger.log(
      `[${timestamp}] ${method} ${url} ${ip} ${userAgent} ${JSON.stringify(body)}`,
    );

    return next.handle().pipe(
      tap<unknown>({
        next: (data: unknown) => {
          this.logger.log(
            `Success - ${method} ${url} => ${JSON.stringify(data)}`,
          );
        },
        error: (error: Error) => {
          this.logger.error(
            `Error - ${method} ${url} => ${error.message}`,
          );
        },
      }),
    );
  }
}
