import { Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Request, Response } from 'express';
import { LogDNAhttpExceptionLoggerOptions } from './logdna.options';
import {v4 as uuid} from 'uuid';
import { LogDNAService } from './logdna.service';

@Catch()
export class LogDNAhttpExceptionLogger extends BaseExceptionFilter {
  constructor(private readonly options: LogDNAhttpExceptionLoggerOptions | undefined = undefined) {
    super()
  }
  catch(ex: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();
    if(!(this.options?.filter?.(ex, req, res) ?? true)) {
      return super.catch(ex, host);
    }
    let msg = 
      this.options?.messageFormat?.(ex, req, res) ?? 
      `[${ex.name}]`;
    if(this.options?.generateReference) {
      const ref = uuid();
      const appendix = ` Error: ${ref}`;
      ex.message += appendix;
      msg += appendix;
      res.locals.errorRef = ref;
    }
    const meta = 
      this.options?.exceptionMetaTransform?.(ex, req, res) ?? 
      ex;
    LogDNAService.LogDNAServiceInstance().error(msg, meta);
    super.catch(ex, host);
  }
}