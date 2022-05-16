import { ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { LogDNAhttpExceptionLoggerOptions } from './logdna.options';
export declare class LogDNAhttpExceptionLogger {
    private readonly options;
    constructor(options?: LogDNAhttpExceptionLoggerOptions | undefined);
    catch(ex: HttpException, host: ArgumentsHost): Response<any, Record<string, any>>;
}
