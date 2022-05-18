"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLogDNAProviders = void 0;
const logdna_constants_1 = require("./logdna.constants");
const logdna_service_1 = require("./logdna.service");
function createLogDNAProviders(options) {
    return {
        provide: logdna_constants_1.LOGDNA_TOKEN,
        useValue: new logdna_service_1.LogDNAService(options),
    };
}
exports.createLogDNAProviders = createLogDNAProviders;
