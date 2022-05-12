import { createLogger, Logger } from '@logdna/logger';
import { Inject, Injectable } from '@nestjs/common';
import { LoggerService } from '@nestjs/common';
import { LOGDNA_MODULE_OPTIONS } from './logdna.constants';
import { LogDNAModuleOptions } from './logdna.options';

@Injectable()
export class LogDNAService implements LoggerService {
  private static logDNAinstance: Logger;
  private static serviceInstance: LogDNAService;

  constructor(
    @Inject(LOGDNA_MODULE_OPTIONS) readonly options?: LogDNAModuleOptions
  ) {
    if (!options) {
      return;
    }
    //inject custom level 'verbose' and 'http'
    if (!options.logDNAOptions) options.logDNAOptions = {};
    if (!options.logDNAOptions.levels) options.logDNAOptions.levels = [];
    options.logDNAOptions.levels.push('info', 'error', 'warn', 'debug', 'verbose', 'http');
    //instantiate logger
    LogDNAService.logDNAinstance = createLogger(
      options.ingestionKey,
      options.logDNAOptions
    );
  }

  public static LogDNAServiceInstance(): LogDNAService {
    if (!LogDNAService.serviceInstance) {
      LogDNAService.serviceInstance = new LogDNAService();
    }
    return LogDNAService.serviceInstance;
  }

  log(message: any, ...optionalParams: any[]) {
    try {
      LogDNAService.logDNAinstance.log(JSON.stringify(message), {
        timestamp: Date.now(),
        meta: Object.assign({}, ...optionalParams),
      });
    } catch {}
  }

  error(message: any, ...optionalParams: any[]) {
    try {
      LogDNAService.logDNAinstance.log(JSON.stringify(message), {
        timestamp: Date.now(),
        meta: Object.assign({}, ...optionalParams),
        level: 'error',
      });
    } catch {}
  }

  warn(message: any, ...optionalParams: any[]) {
    try {
      LogDNAService.logDNAinstance.log(JSON.stringify(message), {
        timestamp: Date.now(),
        meta: Object.assign({}, ...optionalParams),
        level: 'warn',
      });
    } catch {}
  }

  debug(message: any, ...optionalParams: any[]) {
    try {
      LogDNAService.logDNAinstance.log(JSON.stringify(message), {
        timestamp: Date.now(),
        meta: Object.assign({}, ...optionalParams),
        level: 'debug',
      });
    } catch {}
  }

  verbose(message: any, ...optionalParams: any[]) {
    try {
      LogDNAService.logDNAinstance.log(JSON.stringify(message), {
        timestamp: Date.now(),
        meta: Object.assign({}, ...optionalParams),
        level: 'verbose',
      });
    } catch {}
  }

  http(message: any, req: any, res: any) {
    try {
      LogDNAService.logDNAinstance.log(JSON.stringify(message), {
        timestamp: Date.now(),
        meta: {
          request: req,
          response: res,
        },
        level: 'http',
      });
    } catch {}
  }
}
