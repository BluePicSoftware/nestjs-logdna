import { Request, Response, NextFunction } from 'express';
import { LogDNAhttpLoggerOptions } from './logdna.options';
import { LogDNAService } from './logdna.service';

export function LogDNAhttpLogger(options: LogDNAhttpLoggerOptions) {
  return function(req: Request, res: Response, next: NextFunction) {
    const begin = Date.now();
    const { method, path } = req;
    res.on('close', () => {
      if (!(options?.filter?.(req, res) ?? true)) {
        return next();
      }
      const duration = Date.now() - begin;
      const { statusCode } = res;
      let msg =
        options?.messageFormat?.(req, res) ??
        `$[{method}] ${path} ${statusCode} ${duration}ms`;
      if(res.locals.errorRef) {
        msg += ` Error: ${res.locals.errorRef}`;
      }
      const reqMeta = options?.reqMetaTransform?.(req) ?? req;
      const resMeta = options?.resMetaTransform?.(res) ?? res;
      LogDNAService.LogDNAServiceInstance().http(msg, reqMeta, resMeta);
    });
    next();
  };
}
