import { ArgumentsHost } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { LogDNAhttpExceptionLoggerOptions } from './logdna.options';
export declare class LogDNAhttpExceptionLogger extends BaseExceptionFilter {
    private readonly options;
    constructor(options?: LogDNAhttpExceptionLoggerOptions | undefined);
    catch(ex: Error, host: ArgumentsHost): void;
}
