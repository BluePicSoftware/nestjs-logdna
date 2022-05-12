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
const uuid_1 = require("uuid");
const logdna_service_1 = require("./logdna.service");
let LogDNAhttpExceptionLogger = class LogDNAhttpExceptionLogger {
    constructor(options = undefined) {
        this.options = options;
    }
    catch(ex, host) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        const ctx = host.switchToHttp();
        const req = ctx.getRequest();
        const res = ctx.getResponse();
        if (!((_c = (_b = (_a = this.options) === null || _a === void 0 ? void 0 : _a.filter) === null || _b === void 0 ? void 0 : _b.call(_a, ex, req, res)) !== null && _c !== void 0 ? _c : true)) {
            return res.status(500).json({
                message: ex.message
            });
        }
        let msg = (_f = (_e = (_d = this.options) === null || _d === void 0 ? void 0 : _d.messageFormat) === null || _e === void 0 ? void 0 : _e.call(_d, ex, req, res)) !== null && _f !== void 0 ? _f : `[${ex.name}]`;
        let ref;
        if ((_g = this.options) === null || _g === void 0 ? void 0 : _g.generateReference) {
            ref = (0, uuid_1.v4)();
            const appendix = ` Error: ${ref}`;
            msg += appendix;
            res.locals.errorRef = ref;
        }
        const meta = (_k = (_j = (_h = this.options) === null || _h === void 0 ? void 0 : _h.exceptionMetaTransform) === null || _j === void 0 ? void 0 : _j.call(_h, ex, req, res)) !== null && _k !== void 0 ? _k : ex;
        logdna_service_1.LogDNAService.LogDNAServiceInstance().error(msg, meta);
        return res.status(500).json({
            message: ex.message,
            error: ref
        });
    }
};
LogDNAhttpExceptionLogger = __decorate([
    (0, common_1.Catch)(),
    __metadata("design:paramtypes", [Object])
], LogDNAhttpExceptionLogger);
exports.LogDNAhttpExceptionLogger = LogDNAhttpExceptionLogger;
//# sourceMappingURL=logdna.filter.js.map