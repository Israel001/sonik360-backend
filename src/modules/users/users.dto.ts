import {
  IsEmail,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class UpdatePasswordDto {
  @IsString()
  @Length(1, 50)
  oldPassword: string;

  @IsString()
  @Length(1, 50)
  newPassword: string;
}

export class CreateUserDto {
  @IsString()
  @Length(1, 50)
  firstname: string;

  @IsString()
  @Length(1, 50)
  lastname: string;

  @IsEmail()
  @Length(1, 50)
  email: string;

  @IsNumberString()
  @Length(1, 15)
  phone: string;

  @IsString()
  @Length(1, 50)
  password: string;

  @IsString()
  @IsOptional()
  @Length(1, 200)
  address: string;
}

export class UpdateUserDto {
  @IsString()
  @Length(1, 50)
  @IsOptional()
  firstname: string;

  @IsString()
  @Length(1, 50)
  @IsOptional()
  lastname: string;

  @IsEmail()
  @Length(1, 50)
  @IsOptional()
  email: string;

  @IsNumberString()
  @Length(1, 15)
  @IsOptional()
  phone: string;

  @IsString()
  @IsOptional()
  @Length(1, 200)
  address: string;
}
