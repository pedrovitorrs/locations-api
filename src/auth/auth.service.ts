import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

const saltOrRounds = 10;

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async login(user: any) {
    const { email, password } = user;
    const foundUser = await this.usersService.findOne(email);
    if (!foundUser) throw new NotFoundException();
    if (!(await bcrypt.compare(password, user.password)))
      throw new ForbiddenException();
    return {
      user,
      token: await this.jwtService.signAsync({ email, sub: user.id }),
    };
  }

  async signup(
    fullName,
    email: string,
    password?: string
  ): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user) throw new HttpException("Username taken", HttpStatus.BAD_REQUEST);

    const newUser = await this.usersService.create(
      fullName,
      email,
      password,
    );

    return {
      id: newUser.id,
    };
  }

  findUserByEmail(email: string) {
    return this.usersService.findOne(email);
  }
}
