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
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        const ctx = host.switchToHttp();
        const req = ctx.getRequest();
        const res = ctx.getResponse();
        if (!((_c = (_b = (_a = this.options) === null || _a === void 0 ? void 0 : _a.filter) === null || _b === void 0 ? void 0 : _b.call(_a, ex, req, res)) !== null && _c !== void 0 ? _c : true)) {
            return res.status((_d = ex.getStatus()) !== null && _d !== void 0 ? _d : 500).json({
                message: ex.message
            });
        }
        let msg = (_g = (_f = (_e = this.options) === null || _e === void 0 ? void 0 : _e.messageFormat) === null || _f === void 0 ? void 0 : _f.call(_e, ex, req, res)) !== null && _g !== void 0 ? _g : `[${ex.name}]`;
        let ref;
        if ((_h = this.options) === null || _h === void 0 ? void 0 : _h.generateReference) {
            ref = (0, crypto_1.randomBytes)(20).toString('base64url');
            const appendix = ` Error: ${ref}`;
            msg += appendix;
            res.locals.errorRef = ref;
        }
        const meta = (_l = (_k = (_j = this.options) === null || _j === void 0 ? void 0 : _j.exceptionMetaTransform) === null || _k === void 0 ? void 0 : _k.call(_j, ex, req, res)) !== null && _l !== void 0 ? _l : ex;
        logdna_service_1.LogDNAService.LogDNAServiceInstance().error(msg, meta);
        return res.status((_m = ex.getStatus()) !== null && _m !== void 0 ? _m : 500).json({
            message: ex.message,
            ref: ref
        });
    }
};
LogDNAhttpExceptionLogger = __decorate([
    (0, common_1.Catch)(),
    __metadata("design:paramtypes", [Object])
], LogDNAhttpExceptionLogger);
exports.LogDNAhttpExceptionLogger = LogDNAhttpExceptionLogger;
//# sourceMappingURL=logdna.filter.js.map