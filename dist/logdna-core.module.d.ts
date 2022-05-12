import { DynamicModule } from '@nestjs/common';
import { LogDNAModuleAsyncOptions, LogDNAModuleOptions } from './logdna.options';
export declare class LogDNACoreModule {
    static forRoot(options: LogDNAModuleOptions): DynamicModule;
    static forRootAsync(options: LogDNAModuleAsyncOptions): DynamicModule;
    private static createAsyncProviders;
    private static createAsyncOptionsProvider;
}
