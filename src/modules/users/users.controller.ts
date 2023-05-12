import { Body, Controller, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { CreateUserDto, UpdatePasswordDto, UpdateUserDto } from "./users.dto";
import { UsersService } from "./users.service";

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }
  
  @Post()
  register(@Body() body: CreateUserDto) {
    return this.usersService.register(body);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateUserDto) {
    return this.usersService.update(id, body);
  }

  @Put(':id/update-password')
  updatePassword(@Param('id', ParseIntPipe) id: number, @Body() body: UpdatePasswordDto) {
    return this.usersService.updatePassword(id, body);
  }
}