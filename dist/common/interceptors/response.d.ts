import { NestInterceptor, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
interface data<T> {
    data: T;
}
export declare class Response<T = any> implements NestInterceptor {
    intercept(context: any, next: CallHandler): Observable<data<T>>;
}
export {};
