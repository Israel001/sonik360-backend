import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdatePasswordDto, UpdateUserDto } from './users.dto';
import { User } from './users.entity';
import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  public logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User) public userRepository: Repository<User>,
  ) {}

  async register(user: CreateUserDto) {
    const existingUser = await this.userRepository.findOne({
      where: [{ email: user.email }, { phone: user.phone }],
    });
    if (existingUser) {
      if (existingUser.email === user.email)
        throw new ConflictException(
          `User with email: ${user.email} already exist`,
        );
      if (existingUser.phone === user.phone)
        throw new ConflictException(
          `User with phone: ${user.phone} already exist`,
        );
    }
    const hashedPassword = await bcrypt.hash(user.password, 12);
    const userModel = this.userRepository.create({
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      phone: user.phone,
      password: hashedPassword,
      address: user.address,
    });
    return await userModel.save();
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({
      where: {
        email,
      },
    });
  }

  async updatePassword(id: number, request: UpdatePasswordDto) {
    let user: User;
    user = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException('User does not exist');

    const passwordMatch = await bcrypt.compare(request.oldPassword, user.password);
    if (!passwordMatch) throw new BadRequestException('Old passwords does not match');

    const hashedPassword = await bcrypt.hash(request.newPassword, 12);
    user = await this.userRepository.save({ id, password: hashedPassword });

    this.logger.debug(`Successfully update password for user with ID: ${user.id}`);
    return user;
  }

  async update(id: number, request: UpdateUserDto) {
    let user: User;
    user = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException('User does not exist');

    let existingUser = await this.findByEmail(request.email);
    if (existingUser && existingUser.id !== id) throw new ConflictException('User with email already exists')

    existingUser = await this.userRepository.findOne({
      where: { phone: request.phone }
    });
    if (existingUser && existingUser.id !== id) throw new ConflictException('User with phone number already exists');

    const userModel = this.userRepository.create({
      firstname: request.firstname,
      lastname: request.lastname,
      email: request.email,
      phone: request.phone,
      address: request.address,
    });
    user = await this.userRepository.save({ id, ...userModel });

    this.logger.debug(`Successfully updated user with ID: ${id}`);

    delete user.password;
    delete user.createdAt;
    delete user.updatedAt;

    return user;
  }
}
