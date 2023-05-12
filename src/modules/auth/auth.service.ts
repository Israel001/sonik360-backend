import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { UsersService } from "../users/users.service";
import bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private readonly jwtService: JwtService
  ) { }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new NotFoundException("User not found");
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) return user;
    throw new UnauthorizedException("Invalid details");
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    const userInfo = await this.usersService.findByEmail(user.email);
    delete userInfo.password;
    delete userInfo.createdAt;
    delete userInfo.updatedAt;
    return {
      accessToken: this.jwtService.sign(payload),
      user: userInfo
    };
  }
}
