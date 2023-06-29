import { ExceptionFilter, ArgumentsHost, HttpException } from '@nestjs/common';
export declare class HttpFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost): void;
}
