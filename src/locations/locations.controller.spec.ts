import { Test, TestingModule } from '@nestjs/testing';
import { LocationsController } from './locations.controller';
import { LocationsService } from './locations.service';
import { JwtModule } from "@nestjs/jwt";
import { DatabaseModule } from "../database.module";
import { LocationsProviders } from './locations.providers';

describe('LocationsController', () => {
  let controller: LocationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule, JwtModule],
      controllers: [LocationsController],
      providers: [LocationsService, ...LocationsProviders],
    }).compile();

    controller = module.get<LocationsController>(LocationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
