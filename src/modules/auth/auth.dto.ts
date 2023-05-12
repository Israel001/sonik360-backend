import { IsEmail, Length } from "class-validator";

export class LoginDTO {
  @IsEmail()
  email: string;

  @Length(6, 50)
  password: string;
}