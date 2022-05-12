"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogDNAhttpLogger = void 0;
const logdna_service_1 = require("./logdna.service");
function LogDNAhttpLogger(options) {
    return function (req, res, next) {
        const begin = Date.now();
        const { method, path } = req;
        res.on('close', () => {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            if (!((_b = (_a = options === null || options === void 0 ? void 0 : options.filter) === null || _a === void 0 ? void 0 : _a.call(options, req, res)) !== null && _b !== void 0 ? _b : true)) {
                return next();
            }
            const duration = Date.now() - begin;
            const { statusCode } = res;
            let msg = (_d = (_c = options === null || options === void 0 ? void 0 : options.messageFormat) === null || _c === void 0 ? void 0 : _c.call(options, req, res)) !== null && _d !== void 0 ? _d : `$[{method}] ${path} ${statusCode} ${duration}ms`;
            if (res.locals.errorRef) {
                msg += ` Error: ${res.locals.errorRef}`;
            }
            const reqMeta = (_f = (_e = options === null || options === void 0 ? void 0 : options.reqMetaTransform) === null || _e === void 0 ? void 0 : _e.call(options, req)) !== null && _f !== void 0 ? _f : req;
            const resMeta = (_h = (_g = options === null || options === void 0 ? void 0 : options.resMetaTransform) === null || _g === void 0 ? void 0 : _g.call(options, res)) !== null && _h !== void 0 ? _h : res;
            logdna_service_1.LogDNAService.LogDNAServiceInstance().http(msg, reqMeta, resMeta);
        });
        next();
    };
}
exports.LogDNAhttpLogger = LogDNAhttpLogger;
//# sourceMappingURL=logdna.middleware.js.map