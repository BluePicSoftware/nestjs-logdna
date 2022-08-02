"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogDNAhttpLogger = void 0;
const logdna_service_1 = require("./logdna.service");
const request_ip_1 = require("@supercharge/request-ip");
function LogDNAhttpLogger(options) {
    return function (req, res, next) {
        const begin = Date.now();
        const { method, url } = req;
        var end = res.end;
        res.end = function (chunk, encoding) {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
            const duration = Date.now() - begin;
            res.end = end;
            res.end(chunk, encoding);
            if (!((_b = (_a = options === null || options === void 0 ? void 0 : options.filter) === null || _a === void 0 ? void 0 : _a.call(options, req, res)) !== null && _b !== void 0 ? _b : true)) {
                return;
            }
            const { statusCode } = res;
            let msg = (_d = (_c = options === null || options === void 0 ? void 0 : options.messageFormat) === null || _c === void 0 ? void 0 : _c.call(options, req, res)) !== null && _d !== void 0 ? _d : `[${method}] ${url} ${statusCode} ${duration}ms`;
            if ((_e = res.locals) === null || _e === void 0 ? void 0 : _e.errorRef) {
                msg += ` Error: ${res.locals.errorRef}`;
            }
            let body;
            if (chunk) {
                const contentType = (_f = res.getHeader('content-type')) === null || _f === void 0 ? void 0 : _f.toString();
                if (contentType === null || contentType === void 0 ? void 0 : contentType.includes('text')) {
                    body = chunk.toString();
                }
                else if (contentType === null || contentType === void 0 ? void 0 : contentType.includes('json')) {
                    body = safeJSONParse(chunk.toString());
                }
            }
            const defaultReqDTO = reqDTO(req);
            const defaultResDTO = resDTO(res, body);
            const reqMeta = (_h = (_g = options === null || options === void 0 ? void 0 : options.reqMetaTransform) === null || _g === void 0 ? void 0 : _g.call(options, req, defaultReqDTO)) !== null && _h !== void 0 ? _h : defaultReqDTO;
            const resMeta = (_k = (_j = options === null || options === void 0 ? void 0 : options.resMetaTransform) === null || _j === void 0 ? void 0 : _j.call(options, res, defaultResDTO)) !== null && _k !== void 0 ? _k : defaultResDTO;
            logdna_service_1.LogDNAService.LogDNAServiceInstance().http(msg, reqMeta, resMeta);
        };
        next();
    };
}
exports.LogDNAhttpLogger = LogDNAhttpLogger;
function reqDTO(req) {
    return {
        protocol: req.protocol,
        ip: (0, request_ip_1.getClientIp)(req),
        path: req.url,
        params: req.params,
        method: req.method,
        headers: req.headers,
        body: req.body,
    };
}
function resDTO(res, body) {
    return {
        statusCode: res.statusCode,
        statusMessage: res.statusMessage,
        headers: res.getHeaders(),
        locals: res.locals,
        body,
    };
}
function safeJSONParse(input) {
    try {
        return JSON.parse(input);
    }
    catch (e) {
        return input;
    }
}
//# sourceMappingURL=logdna.middleware.js.map