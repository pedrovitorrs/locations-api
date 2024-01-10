import { Module } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { LocationsController } from './locations.controller';
import { JwtModule } from "@nestjs/jwt";
import { DatabaseModule } from "src/database.module";
import { LocationsProviders } from './locations.providers';

@Module({
  imports: [DatabaseModule, JwtModule],
  controllers: [LocationsController],
  providers: [LocationsService, ...LocationsProviders],
})
export class LocationsModule {}
