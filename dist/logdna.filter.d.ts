import { ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { LogDNAhttpExceptionLoggerOptions } from './logdna.options';
export declare class LogDNAhttpExceptionLogger {
    private readonly options;
    constructor(options?: LogDNAhttpExceptionLoggerOptions | undefined);
    catch(ex: Error, host: ArgumentsHost): Response<any, Record<string, any>>;
}
