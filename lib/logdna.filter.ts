import { Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { LogDNAhttpExceptionLoggerOptions } from './logdna.options';
import { LogDNAService } from './logdna.service';
import { randomBytes } from 'crypto';

@Catch()
export class LogDNAhttpExceptionLogger {
  constructor(
    private readonly options: LogDNAhttpExceptionLoggerOptions | undefined = undefined
  ) {}
  catch(ex: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();
    if(!(this.options?.filter?.(ex, req, res) ?? true)) {
      return res.status(ex.getStatus() ?? 500).json({
        message: ex.message
      })
    }
    let msg = 
      this.options?.messageFormat?.(ex, req, res) ?? 
      `[${ex.name}]`;
    let ref;
    if(this.options?.generateReference) {
      ref = randomBytes(20).toString('base64url');
      const appendix = ` Error: ${ref}`;
      msg += appendix;
      res.locals.errorRef = ref;
    }
    const meta = 
      this.options?.exceptionMetaTransform?.(ex, req, res) ?? 
      ex;
    LogDNAService.LogDNAServiceInstance().error(msg, meta);
    return res.status(ex.getStatus() ?? 500).json({
      message: ex.message,
      ref: ref
    })
  }
}