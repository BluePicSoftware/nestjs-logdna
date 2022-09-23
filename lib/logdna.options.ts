import { ModuleMetadata, Type } from '@nestjs/common';
import { ConstructorOptions } from '@logdna/logger';
import { Request, Response } from 'express';

export type LogLevel = 'info' | 'error' | 'warn' | 'debug' | 'verbose' | 'http';

export interface LogDNAModuleOptions {
  testMode?: boolean;
  ingestionKey?: string;
  logDNAOptions?: ConstructorOptions;
}

export interface LogDNAOptionsFactory {
  createLogDNAModuleOptions():
    | Promise<LogDNAModuleOptions>
    | LogDNAModuleOptions;
}

export interface LogDNAModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useClass?: Type<LogDNAOptionsFactory>;
  useExisting?: Type<LogDNAOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<LogDNAModuleOptions> | LogDNAModuleOptions;
}

export interface LogDNAhttpLoggerOptions {
  /**
   * Function to determine if req/res should be logged.
   * @default 'All req/res are logged'
   */
  filter?: (req: Request, res: Response) => boolean;
  /**
   * Function to override default log message.
   * @default '[METHOD] [path] [status] [duration]'
   */
  messageFormat?: (req: Request, res: Response) => string;
  /**
   * Function to transform request object before it's added to log meta
   */
  reqMetaTransform?: (req: Request, defaultTransform: defaultReqTransform) => any;
  /**
   * Function to transform response object before it's added to log meta
   */
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
    /**
   * generate reference code which will be appended to exception message, log message and req/res log message
   */
    generateReference?: boolean;
  /**
   * Function to determine if exception should be logged
   * @default 'All exceptions are logged'
   */
  filter?: (exception: unknown, req: Request, res: Response) => boolean;
  /**
   * Function to transform exception object before it's added to log meta
   */
  exceptionMetaTransform?: (exception: unknown, req: Request, res: Response) => any;
  /**
   * Function to override default log message.
   * @default '[Error name]'
   */
  messageFormat?: (exception: unknown, req: Request, res: Response) => string;
}
