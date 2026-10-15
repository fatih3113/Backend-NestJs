import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


export interface StandardResponse<T> {
  succes: boolean;
  message: string;
  data: T;
  statusCode: number;
}
 


@Injectable()
export class TransformResponseInterceptor<T> implements NestInterceptor<T, StandardResponse<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<StandardResponse<T>> {


    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    const statusCode = response.statusCode;

    return next.handle().pipe(
      map((data: T) => ({
        succes: true,
        message: 'Success (Data Berhasil di ambil)',
        statusCode,
        data
      }))
    );
  }
}
