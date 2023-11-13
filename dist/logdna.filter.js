"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogDNAhttpExceptionLogger = void 0;
const common_1 = require("@nestjs/common");
const logdna_service_1 = require("./logdna.service");
const crypto_1 = require("crypto");
let LogDNAhttpExceptionLogger = class LogDNAhttpExceptionLogger {
    constructor(options = undefined) {
        this.options = options;
    }
    catch(ex, host) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
        if ((_a = ex.response) === null || _a === void 0 ? void 0 : _a.message) {
            ex.message = (_b = ex.response) === null || _b === void 0 ? void 0 : _b.message;
        }
        const ctx = host.switchToHttp();
        const req = ctx.getRequest();
        const res = ctx.getResponse();
        if (!((_e = (_d = (_c = this.options) === null || _c === void 0 ? void 0 : _c.filter) === null || _d === void 0 ? void 0 : _d.call(_c, ex, req, res)) !== null && _e !== void 0 ? _e : true)) {
            return res.status((_g = (_f = ex.getStatus) === null || _f === void 0 ? void 0 : _f.call(ex)) !== null && _g !== void 0 ? _g : 500).json({
                message: ex.message,
            });
        }
        let msg = (_k = (_j = (_h = this.options) === null || _h === void 0 ? void 0 : _h.messageFormat) === null || _j === void 0 ? void 0 : _j.call(_h, ex, req, res)) !== null && _k !== void 0 ? _k : `[${ex.name}]`;
        let ref;
        if ((_l = this.options) === null || _l === void 0 ? void 0 : _l.generateReference) {
            ref = (0, crypto_1.randomBytes)(20).toString("base64url");
            const appendix = ` Error: ${ref}`;
            msg += appendix;
            res.header("X-Error-Ref", ref);
        }
        const meta = (_p = (_o = (_m = this.options) === null || _m === void 0 ? void 0 : _m.exceptionMetaTransform) === null || _o === void 0 ? void 0 : _o.call(_m, ex, req, res)) !== null && _p !== void 0 ? _p : {
            ref: ref,
            name: ex.name,
            message: ex.message,
            stack: ex.stack,
        };
        logdna_service_1.LogDNAService.LogDNAServiceInstance().error(msg, meta);
        return res.status((_r = (_q = ex.getStatus) === null || _q === void 0 ? void 0 : _q.call(ex)) !== null && _r !== void 0 ? _r : 500).send({
            message: ex.message,
            ref: ref,
        });
    }
};
LogDNAhttpExceptionLogger = __decorate([
    (0, common_1.Catch)(),
    __metadata("design:paramtypes", [Object])
], LogDNAhttpExceptionLogger);
exports.LogDNAhttpExceptionLogger = LogDNAhttpExceptionLogger;
//# sourceMappingURL=logdna.filter.js.map