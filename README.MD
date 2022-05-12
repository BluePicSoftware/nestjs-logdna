[![npm version](https://img.shields.io/npm/v/@bluepic/logdna-nestjs)](https://www.npmjs.com/package/@bluepic/logdna-nestjs "View this project on npm")
[![ISC license](http://img.shields.io/badge/license-ISC-brightgreen.svg)](http://opensource.org/licenses/ISC)

<p align="center">
  <h3 align="center">
    @bluepic/logdna-nestjs
  </h3>

  <p align="center">
    Provides an injectable LogDNA client for logging in nestjs modules
  </p>
</p>

  This is a fork of [@ntegral/nestjs-sentry](https://github.com/ntegral/nestjs-sentry)
## Table Of Contents

- [Table Of Contents](#table-of-contents)
- [About](#about)
- [Installation](#installation)
- [Getting Started](#getting-started)
- [Middleware](#middleware)
- [Exception Filter](#exception-filter)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## About

`@bluepic/logdna-nestjs` implements a module, `LogDNAModule`, which when imported into
your nestjs project provides a LogDNA client to any class that injects it. This
lets LogDNA be worked into your dependency injection workflow without having to
do any extra work outside of the initial setup.

## Installation

```bash
npm install --save @bluepic/logdna-nestjs @logdna/logger
```
## Getting Started

The simplest way to use `@bluepic/logdna-nestjs` is to use `LogDNAModule.forRootAsync`

```typescript
import { Module } from '@nestjs-common';
import { LogDNAModule } from '@bluepic/logdna-nestjs';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    LogDNAModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        ingestionKey: configService.get('LOGDNA_INGESTION_KEY'),
        logDNAOptions: {
          app: 'App Name',
          env: process.env.NODE_ENV,
          defaultLevel: 'info',
          hostname: 'Hostname',
        },
      }),
      inject: [ConfigService],
    });
  ],
})
export class AppModule {}
```

You can then inject the LogDNA client into any of your injectables by using a
custom decorator

```typescript
import { Injectable } from '@nestjs/common';
import { LogDNAService, InjectLogDNA } from '@bluepic/logdna-nestjs';

@Injectable()
export class AppService {
  constructor(@InjectLogDNA() private readonly logger: LogDNAService) {}
  testLogger() {
    this.logger.log('TEST');
  }
}
```

You can instruct Nest to use the LogDNAService as the default logger:

```typescript
import { LogDNAService } from '@bluepic/logdna-nestjs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: false });

  app.useLogger(LogDNAService.LogDNAServiceInstance());

  await app.listen(3000);
}
bootstrap();
```

## Middleware

You can use the LogDNAhttpLogger Middleware to automatically log all incoming requests/outgoing responses

```typescript
import { LogDNAhttpLogger } from '@bluepic/logdna-nestjs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(LogDNAhttpLogger({
    filter: (req, res) => res.statusCode == 500
  }))

  await app.listen(3000);
}
bootstrap();
```

## Exception Filter

You can use the LogDNAhttpExceptionLogger to automatically log exceptions

```typescript
import { LogDNAhttpExceptionLogger } from '@bluepic/logdna-nestjs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new LogDNAhttpExceptionLogger({
    generateReference: true
  }));

  await app.listen(3000);
}
bootstrap();
```

## License

Distributed under the ISC License. See `LICENSE` for more information.

## Acknowledgements

- This is a fork of [@ntegral/nestjs-sentry](https://github.com/ntegral/nestjs-sentry)
- [nestjs](https://nestjs.com)
- [logdna](https://www.logdna.com/)
- [@logdna/logger](https://www.npmjs.com/package/@logdna/logger)