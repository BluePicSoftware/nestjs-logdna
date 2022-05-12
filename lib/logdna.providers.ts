import { Provider } from '@nestjs/common';
import { LOGDNA_TOKEN } from './logdna.constants';
import { LogDNAModuleOptions } from './logdna.options';
import { LogDNAService } from './logdna.service';

export function createLogDNAProviders(options: LogDNAModuleOptions): Provider {
  return {
    provide: LOGDNA_TOKEN,
    useValue: new LogDNAService(options),
  };
}
