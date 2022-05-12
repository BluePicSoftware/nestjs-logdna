import { DynamicModule } from '@nestjs/common';
import { LogDNAModuleAsyncOptions, LogDNAModuleOptions } from './logdna.options';
export declare class LogDNAModule {
    static forRoot(options: LogDNAModuleOptions): DynamicModule;
    static forRootAsync(options: LogDNAModuleAsyncOptions): DynamicModule;
}
