"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectLogDNAModuleConfig = exports.InjectLogDNA = void 0;
const injectDecoratorFactory_1 = require("./injectDecoratorFactory");
const logdna_constants_1 = require("./logdna.constants");
exports.InjectLogDNA = (0, injectDecoratorFactory_1.makeInjectableDecorator)(logdna_constants_1.LOGDNA_TOKEN);
exports.InjectLogDNAModuleConfig = (0, injectDecoratorFactory_1.makeInjectableDecorator)(logdna_constants_1.LOGDNA_MODULE_OPTIONS);
