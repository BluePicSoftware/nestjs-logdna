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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var LogDNAService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogDNAService = void 0;
const logger_1 = require("@logdna/logger");
const common_1 = require("@nestjs/common");
const logdna_constants_1 = require("./logdna.constants");
let LogDNAService = LogDNAService_1 = class LogDNAService {
    constructor(options) {
        this.options = options;
        if (!options) {
            console.log('options not found. Did you use LogDNAModule.forRoot?');
            return;
        }
        if (!options.logDNAOptions)
            options.logDNAOptions = {};
        if (!options.logDNAOptions.levels)
            options.logDNAOptions.levels = [];
        options.logDNAOptions.levels.push('verbose', 'http');
        this.logDNAinstance = (0, logger_1.createLogger)(options.ingestionKey, options.logDNAOptions);
    }
    static LogDNAServiceInstance() {
        if (!LogDNAService_1.serviceInstance) {
            LogDNAService_1.serviceInstance = new LogDNAService_1();
        }
        return LogDNAService_1.serviceInstance;
    }
    log(message, ...optionalParams) {
        this.logDNAinstance.log(JSON.stringify(message), {
            timestamp: Date.now(),
            meta: Object.assign({}, ...optionalParams),
        });
    }
    error(message, ...optionalParams) {
        this.logDNAinstance.log(JSON.stringify(message), {
            timestamp: Date.now(),
            meta: Object.assign({}, ...optionalParams),
            level: logger_1.LogLevel.error,
        });
    }
    warn(message, ...optionalParams) {
        this.logDNAinstance.log(JSON.stringify(message), {
            timestamp: Date.now(),
            meta: Object.assign({}, ...optionalParams),
            level: logger_1.LogLevel.warn,
        });
    }
    debug(message, ...optionalParams) {
        this.logDNAinstance.log(JSON.stringify(message), {
            timestamp: Date.now(),
            meta: Object.assign({}, ...optionalParams),
            level: logger_1.LogLevel.debug,
        });
    }
    verbose(message, ...optionalParams) {
        this.logDNAinstance.log(JSON.stringify(message), {
            timestamp: Date.now(),
            meta: Object.assign({}, ...optionalParams),
            level: 'verbose',
        });
    }
    http(message, req, res) {
        this.logDNAinstance.log(JSON.stringify(message), {
            timestamp: Date.now(),
            meta: {
                request: req,
                response: res,
            },
            level: 'http',
        });
    }
};
LogDNAService = LogDNAService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(logdna_constants_1.LOGDNA_MODULE_OPTIONS)),
    __metadata("design:paramtypes", [Object])
], LogDNAService);
exports.LogDNAService = LogDNAService;
//# sourceMappingURL=logdna.service.js.map