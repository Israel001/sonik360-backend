import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { RedisConfiguration } from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as ormconfig from './config/ormconfig';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { AddCorrelationIdInterceptor } from './lib/add-correlation-id-interceptor';
import { TimeoutInterceptor } from './lib/timeout.interceptor';
import { RequestLoggerMiddleware } from './middleware/request-logger-middleware';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { OrdersModule } from './modules/orders/orders.module';
import { ProductsModule } from './modules/products/products.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CategoriesModule } from './modules/categories/categories.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'images')
    }),
    AutomapperModule.forRoot({
      options: [{ name: 'classMapper', pluginInitializer: classes }],
      singular: true,
    }),
    ConfigModule.forRoot({
      load: [RedisConfiguration],
    }),
    TypeOrmModule.forRoot(ormconfig),
    UsersModule,
    OrdersModule,
    ProductsModule,
    CategoriesModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: AddCorrelationIdInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TimeoutInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}
