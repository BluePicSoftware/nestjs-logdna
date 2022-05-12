import { Module, Global, Provider, Type, DynamicModule } from '@nestjs/common';
import { LOGDNA_MODULE_OPTIONS, LOGDNA_TOKEN } from './logdna.constants';
import {
  LogDNAModuleAsyncOptions,
  LogDNAModuleOptions,
  LogDNAOptionsFactory,
} from './logdna.options';
import { createLogDNAProviders } from './logdna.providers';
import { LogDNAService } from './logdna.service';

@Global()
@Module({})
export class LogDNACoreModule {
  public static forRoot(options: LogDNAModuleOptions): DynamicModule {
    const provider = createLogDNAProviders(options);

    return {
      exports: [provider, LogDNAService],
      module: LogDNACoreModule,
      providers: [provider, LogDNAService],
    };
  }

  public static forRootAsync(options: LogDNAModuleAsyncOptions): DynamicModule {
    const provider: Provider = {
      inject: [LOGDNA_MODULE_OPTIONS],
      provide: LOGDNA_TOKEN,
      useFactory: (options: LogDNAModuleOptions) => new LogDNAService(options),
    };

    return {
      exports: [provider, LogDNAService],
      imports: options.imports,
      module: LogDNACoreModule,
      providers: [
        ...this.createAsyncProviders(options),
        provider,
        LogDNAService,
      ],
    };
  }

  private static createAsyncProviders(
    options: LogDNAModuleAsyncOptions
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
    const useClass = options.useClass as Type<LogDNAOptionsFactory>;
    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: useClass,
        useClass,
      },
    ];
  }

  private static createAsyncOptionsProvider(
    options: LogDNAModuleAsyncOptions
  ): Provider {
    if (options.useFactory) {
      return {
        inject: options.inject || [],
        provide: LOGDNA_MODULE_OPTIONS,
        useFactory: options.useFactory,
      };
    }
    const inject = [
      (options.useClass || options.useExisting) as Type<LogDNAOptionsFactory>,
    ];
    return {
      provide: LOGDNA_MODULE_OPTIONS,
      useFactory: async (optionsFactory: LogDNAOptionsFactory) =>
        await optionsFactory.createLogDNAModuleOptions(),
      inject,
    };
  }
}
