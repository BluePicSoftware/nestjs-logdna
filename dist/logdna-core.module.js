"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var LogDNACoreModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogDNACoreModule = void 0;
const common_1 = require("@nestjs/common");
const logdna_constants_1 = require("./logdna.constants");
const logdna_providers_1 = require("./logdna.providers");
const logdna_service_1 = require("./logdna.service");
let LogDNACoreModule = LogDNACoreModule_1 = class LogDNACoreModule {
    static forRoot(options) {
        const provider = (0, logdna_providers_1.createLogDNAProviders)(options);
        return {
            exports: [provider, logdna_service_1.LogDNAService],
            module: LogDNACoreModule_1,
            providers: [provider, logdna_service_1.LogDNAService],
        };
    }
    static forRootAsync(options) {
        const provider = {
            inject: [logdna_constants_1.LOGDNA_MODULE_OPTIONS],
            provide: logdna_constants_1.LOGDNA_TOKEN,
            useFactory: (options) => new logdna_service_1.LogDNAService(options),
        };
        return {
            exports: [provider, logdna_service_1.LogDNAService],
            imports: options.imports,
            module: LogDNACoreModule_1,
            providers: [
                ...this.createAsyncProviders(options),
                provider,
                logdna_service_1.LogDNAService,
            ],
        };
    }
    static createAsyncProviders(options) {
        if (options.useExisting || options.useFactory) {
            return [this.createAsyncOptionsProvider(options)];
        }
        const useClass = options.useClass;
        return [
            this.createAsyncOptionsProvider(options),
            {
                provide: useClass,
                useClass,
            },
        ];
    }
    static createAsyncOptionsProvider(options) {
        if (options.useFactory) {
            return {
                inject: options.inject || [],
                provide: logdna_constants_1.LOGDNA_MODULE_OPTIONS,
                useFactory: options.useFactory,
            };
        }
        const inject = [
            (options.useClass || options.useExisting),
        ];
        return {
            provide: logdna_constants_1.LOGDNA_MODULE_OPTIONS,
            useFactory: (optionsFactory) => __awaiter(this, void 0, void 0, function* () { return yield optionsFactory.createLogDNAModuleOptions(); }),
            inject,
        };
    }
};
LogDNACoreModule = LogDNACoreModule_1 = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({})
], LogDNACoreModule);
exports.LogDNACoreModule = LogDNACoreModule;
