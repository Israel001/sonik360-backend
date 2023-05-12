import { DynamicModule, INestApplicationContext } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { parseCommandLineForClassFlag, startSeeding } from './seed-functions';
import SeederModule from './seeder.module';
import ProductSeed from './seeds/product.seed';

const SeederModuleRegister = (): DynamicModule => {
  return SeederModule.forRoot([ProductSeed]);
};

export async function bootstrap(fromCommandLine: boolean = true) {
  const appContext: INestApplicationContext =
    await NestFactory.createApplicationContext(SeederModuleRegister());
  const commandLineClass = parseCommandLineForClassFlag();
  await startSeeding(
    appContext,
    commandLineClass.foundValue ? commandLineClass.className : null,
  );
  appContext.close();
  if (fromCommandLine) process.exit();
}
