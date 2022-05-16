import { makeInjectableDecorator } from './injectDecoratorFactory';
import { LOGDNA_MODULE_OPTIONS, LOGDNA_TOKEN } from './logdna.constants';

export const InjectLogDNA = makeInjectableDecorator(LOGDNA_TOKEN);

export const InjectLogDNAModuleConfig = makeInjectableDecorator(
  LOGDNA_MODULE_OPTIONS
);
