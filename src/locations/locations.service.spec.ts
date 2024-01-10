import { Test, TestingModule } from '@nestjs/testing';
import { LocationsService } from './locations.service';
import { JwtModule } from "@nestjs/jwt";
import { DatabaseModule } from "../database.module";
import { LocationsProviders } from './locations.providers';

describe('LocationsService', () => {
  let service: LocationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule, JwtModule],
      providers: [LocationsService, ...LocationsProviders],
    }).compile();

    service = module.get<LocationsService>(LocationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
