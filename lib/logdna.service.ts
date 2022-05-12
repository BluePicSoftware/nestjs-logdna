import { createLogger, Logger, LogLevel } from '@logdna/logger';
import { Inject, Injectable } from '@nestjs/common';
import { LoggerService } from '@nestjs/common';
import { LOGDNA_MODULE_OPTIONS } from './logdna.constants';
import { LogDNAModuleOptions } from './logdna.options';

@Injectable()
export class LogDNAService implements LoggerService {
  private logDNAinstance!: Logger;
  private static serviceInstance: LogDNAService;

  constructor(
    @Inject(LOGDNA_MODULE_OPTIONS) readonly options?: LogDNAModuleOptions
  ) {
    if (!options) {
      console.log('options not found. Did you use LogDNAModule.forRoot?');
      return;
    }
    //inject custom level 'verbose' and 'http'
    if (!options.logDNAOptions) options.logDNAOptions = {};
    if (!options.logDNAOptions.levels) options.logDNAOptions.levels = [];
    options.logDNAOptions.levels.push('verbose', 'http');
    //instantiate logger
    this.logDNAinstance = createLogger(
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
    this.logDNAinstance.log(JSON.stringify(message), {
      timestamp: Date.now(),
      meta: Object.assign({}, ...optionalParams),
    });
  }

  error(message: any, ...optionalParams: any[]) {
    this.logDNAinstance.log(JSON.stringify(message), {
      timestamp: Date.now(),
      meta: Object.assign({}, ...optionalParams),
      level: LogLevel.error,
    });
  }

  warn(message: any, ...optionalParams: any[]) {
    this.logDNAinstance.log(JSON.stringify(message), {
      timestamp: Date.now(),
      meta: Object.assign({}, ...optionalParams),
      level: LogLevel.warn,
    });
  }

  debug(message: any, ...optionalParams: any[]) {
    this.logDNAinstance.log(JSON.stringify(message), {
      timestamp: Date.now(),
      meta: Object.assign({}, ...optionalParams),
      level: LogLevel.debug,
    });
  }

  verbose(message: any, ...optionalParams: any[]) {
    this.logDNAinstance.log(JSON.stringify(message), {
      timestamp: Date.now(),
      meta: Object.assign({}, ...optionalParams),
      level: 'verbose',
    });
  }

  http(message: any, req: any, res: any) {
    this.logDNAinstance.log(JSON.stringify(message), {
      timestamp: Date.now(),
      meta: {
        request: req,
        response: res,
      },
      level: 'http',
    });
  }
}
