import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { JwtAuthConfiguration } from "src/config/configuration";
import { JwtAuthConfig } from "src/config/types/jwt-auth.config";
import { JwtStrategy } from "src/strategies/jwt.strategy";
import { LocalStrategy } from "src/strategies/local.strategy";
import { UsersModule } from "../users/users.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
  imports: [
    UsersModule,
    PassportModule,
    ConfigModule.forRoot({
      load: [JwtAuthConfiguration],
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule.forRoot({ load: [JwtAuthConfiguration] })],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<JwtAuthConfig>('jwtAuthConfig').secretKey,
        signOptions: { expiresIn: '1h' }
      }),
      inject: [ConfigService]
    })
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
