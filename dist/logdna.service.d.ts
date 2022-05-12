import { LoggerService } from '@nestjs/common';
import { LogDNAModuleOptions } from './logdna.options';
export declare class LogDNAService implements LoggerService {
    readonly options?: LogDNAModuleOptions | undefined;
    private static logDNAinstance;
    private static serviceInstance;
    constructor(options?: LogDNAModuleOptions | undefined);
    static LogDNAServiceInstance(): LogDNAService;
    log(message: any, ...optionalParams: any[]): void;
    error(message: any, ...optionalParams: any[]): void;
    warn(message: any, ...optionalParams: any[]): void;
    debug(message: any, ...optionalParams: any[]): void;
    verbose(message: any, ...optionalParams: any[]): void;
    http(message: any, req: any, res: any): void;
}
