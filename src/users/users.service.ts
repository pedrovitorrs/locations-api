import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersService {
  constructor(
    @Inject("USER_REPOSITORY")
    private readonly userRepository: Repository<User>,
  ) {}

  async findOne(email: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({
      where: { email }
    });
    return user;
  }

  async create(
    fullName: string,
    email: string,
    password: string
  ): Promise<User | undefined> {
    const user = this.userRepository.create({
      id: this.randomString(32),
      fullName,
      email,
      password
    });

    await this.userRepository.save(user);
    return user;
  }

  randomString(length) {
    let text = "";
    const possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }

  findByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email },
      select: {
        id: true,
        email: true,
      },
    });
  }

  findById(id: string) {
    return this.userRepository.findOne({
      where: { id: id },
      select: {
        password: false,
      },
    });
  }

  findByEmailWithPassword(email: string) {
    return this.userRepository.findOne({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true
      },
    });
  }

  async updateUser(updateUserDto: UpdateUserDto): Promise<User> {
    const { email, ...updateData } = updateUserDto;

    let user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      return null;
    }

    Object.assign(user, updateData);

    user = await this.userRepository.save(user);

    return user;
  }
}
