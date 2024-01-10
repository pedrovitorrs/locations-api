import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database.module";
import { UserProviders } from "./users.providers";
import { UsersService } from "./users.service";

@Module({
  imports: [DatabaseModule],
  providers: [UsersService, ...UserProviders],
  exports: [UsersService],
})
export class UsersModule {}
