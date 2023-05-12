import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { LocalAuthGuard } from "src/guards/local-auth-guard";
import { LoginDTO } from "./auth.dto";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  
  @Post('login')
  @UseGuards(LocalAuthGuard)
  login(@Body() _body: LoginDTO, @Request() req: any) {
    return this.authService.login(req.user);
  }
}