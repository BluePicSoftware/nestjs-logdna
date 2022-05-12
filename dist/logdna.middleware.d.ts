import { Request, Response, NextFunction } from 'express';
import { LogDNAhttpLoggerOptions } from './logdna.options';
export declare function LogDNAhttpLogger(options: LogDNAhttpLoggerOptions): (req: Request, res: Response, next: NextFunction) => void;
