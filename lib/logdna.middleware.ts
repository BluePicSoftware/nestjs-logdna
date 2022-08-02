import { Request, Response, NextFunction } from 'express';
import { defaultReqTransform, defaultResTransform, LogDNAhttpLoggerOptions } from './logdna.options';
import { LogDNAService } from './logdna.service';
import { getClientIp } from '@supercharge/request-ip';

export function LogDNAhttpLogger(options: LogDNAhttpLoggerOptions) {
  return function(req: Request, res: Response, next: NextFunction) {
    const begin = Date.now();
    const { method, url } = req;
    var end = res.end;
    // @ts-expect-error
    res.end = function (chunk, encoding) {
      const duration = Date.now() - begin;

      res.end = end;
      res.end(chunk, encoding);

      if (!(options?.filter?.(req, res) ?? true)) {
        return;
      }  

      const { statusCode } = res;
      let msg =
        options?.messageFormat?.(req, res) ??
        `[${method}] ${url} ${statusCode} ${duration}ms`;
      if(res.locals?.errorRef) {
        msg += ` Error: ${res.locals.errorRef}`;
      }
      let body;
      if (chunk) {
        const contentType = res.getHeader('content-type')?.toString();
        if(contentType?.includes('text')) {
          body = chunk.toString();
        }
        else if(contentType?.includes('json')) {
          body = safeJSONParse(chunk.toString());
        }
      }
      const defaultReqDTO = reqDTO(req);
      const defaultResDTO = resDTO(res, body);
      const reqMeta = options?.reqMetaTransform?.(req, defaultReqDTO) ?? defaultReqDTO;
      const resMeta = options?.resMetaTransform?.(res, defaultResDTO) ?? defaultResDTO;
      LogDNAService.LogDNAServiceInstance().http(msg, reqMeta, resMeta);
    }
    next();
  };
}

function reqDTO(req: Request): defaultReqTransform {
  return {
    protocol: req.protocol,
    ip: getClientIp(req),
    path: req.url,
    params: req.params,
    method: req.method,
    headers: req.headers,
    body: req.body,
  }
}

function resDTO(res: Response, body: any): defaultResTransform {
  return {
    statusCode: res.statusCode,
    statusMessage: res.statusMessage,
    headers: res.getHeaders(),
    locals: res.locals,
    body,
  }
}

function safeJSONParse(input: string) {
  try {
      return JSON.parse(input);
  } catch (e) {
      return input;
  }
}