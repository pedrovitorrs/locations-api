import {
  Controller,
  Body,
  Res,
  NotFoundException,
  HttpStatus,
  Put,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UsersService } from "./users.service";
import { Response } from "express";
import { UpdateUserDto } from "./dto/update-user.dto";

@ApiTags("user")
@Controller("/api/user")
export class AuthController {
  constructor(private readonly userService: UsersService) {}

  @Put()
  async updateUser(
    @Body() updateUserDto: UpdateUserDto,
    @Res() response: Response,
  ) {
    const updatedUser = await this.userService.updateUser(updateUserDto);
    if (!updatedUser) throw new NotFoundException();
    return response.status(HttpStatus.OK).json(updatedUser);
  }
}
