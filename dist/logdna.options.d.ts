import { ModuleMetadata, Type } from '@nestjs/common';
import { ConstructorOptions } from '@logdna/logger';
import { Request, Response } from 'express';
export declare type LogLevel = 'info' | 'error' | 'warn' | 'debug' | 'verbose' | 'http';
export interface LogDNAModuleOptions {
    ingestionKey: string;
    logDNAOptions: ConstructorOptions;
}
export interface LogDNAOptionsFactory {
    createLogDNAModuleOptions(): Promise<LogDNAModuleOptions> | LogDNAModuleOptions;
}
export interface LogDNAModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
    inject?: any[];
    useClass?: Type<LogDNAOptionsFactory>;
    useExisting?: Type<LogDNAOptionsFactory>;
    useFactory?: (...args: any[]) => Promise<LogDNAModuleOptions> | LogDNAModuleOptions;
}
export interface LogDNAhttpLoggerOptions {
    filter?: (req: Request, res: Response) => boolean;
    messageFormat?: (req: Request, res: Response) => string;
    reqMetaTransform?: (req: Request, defaultTransform: defaultReqTransform) => any;
    resMetaTransform?: (res: Response, defaultTransform: defaultResTransform) => any;
}
export interface defaultReqTransform {
    protocol: string;
    ip?: string;
    path: string;
    params?: Object;
    method: string;
    headers?: Object;
    body?: Object;
}
export interface defaultResTransform {
    statusCode: number;
    statusMessage?: string;
    headers?: Object;
    locals?: Object;
    body?: Object;
}
export interface LogDNAhttpExceptionLoggerOptions {
    generateReference?: boolean;
    filter?: (exception: unknown, req: Request, res: Response) => boolean;
    exceptionMetaTransform?: (exception: unknown, req: Request, res: Response) => any;
    messageFormat?: (exception: unknown, req: Request, res: Response) => string;
}
