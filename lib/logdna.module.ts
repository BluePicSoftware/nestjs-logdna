import { Module, DynamicModule } from '@nestjs/common';
import { LogDNACoreModule } from './logdna-core.module';
import {
  LogDNAModuleAsyncOptions,
  LogDNAModuleOptions,
} from './logdna.options';

@Module({})
export class LogDNAModule {
  public static forRoot(options: LogDNAModuleOptions): DynamicModule {
    return {
      module: LogDNAModule,
      imports: [LogDNACoreModule.forRoot(options)],
    };
  }

  public static forRootAsync(options: LogDNAModuleAsyncOptions): DynamicModule {
    return {
      module: LogDNAModule,
      imports: [LogDNACoreModule.forRootAsync(options)],
    };
  }
}
