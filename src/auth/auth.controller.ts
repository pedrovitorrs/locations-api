import {
  Controller,
  Post,
  Get,
  Body,
  HttpStatus,
  HttpCode,
  UseGuards,
  Req,
  NotFoundException,
  UnauthorizedException,
  Param,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignUpDto } from "./dto/signup.dto";
import { UsersService } from "../users/users.service";
import * as bcrypt from "bcrypt";
import { LoginDto } from "./dto/login.dto";
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "src/auth/auth-guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags("auth")
@Controller("/api/auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post("signin")
  async create(@Body() loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.userService.findByEmailWithPassword(email);

    if (!user) throw new NotFoundException();

    const valid = bcrypt.compareSync(password, user.password);

    if (!valid) throw new UnauthorizedException();

    return {
      token: await this.jwtService.signAsync({
        sub: user.id,
        username: user.email,
      }),
    };
  }

  @Post("signup")
  async signup(
    @Body() { fullName, email, password }: SignUpDto,
  ) {
    const newUser = await this.authService.signup(
      fullName,
      email,
      password
    );

    return {
      id: newUser.id,
    };
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get("profile")
  async getProfile(@Req() request,) {
    const {
      user: { sub: userId },
    } = request;
    const user = await this.userService.findById(userId);

    return {
      id: user.id,
      user,
      token: await this.jwtService.signAsync({
        email: user.email,
        sub: user.id,
      }),
    };
  }
}
