import { Test, TestingModule } from "@nestjs/testing";
import { LocationsService } from "./locations.service";
import { JwtModule } from "@nestjs/jwt";
import { DatabaseModule } from "../database.module";
import { LocationsProviders } from "./locations.providers";
import { CreateLocationDto } from "./dto/create-location.dto";

describe("LocationsService", () => {
  let service: LocationsService;
  let moduleFixture: TestingModule;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule, JwtModule],
      providers: [LocationsService, ...LocationsProviders],
    }).compile();

    service = module.get<LocationsService>(LocationsService);
    moduleFixture = module;
  });

  afterAll(async () => {
    await moduleFixture.close();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it('should create a location', async () => {
    const createDto: CreateLocationDto = {
      name: "Santos",
      city: "Sao Paulo",
      state: "Sao Paulo",
    };

    // Act
    const result = await service.create(createDto);

    // Assert
    expect(result).toBeDefined();
  });

  it('should find all locations with a specific name', async () => {
    const name = 'Santos';

    const result = await service.findAll(name);
    console.log(result)
    expect(result[0].name).toEqual(name);
  });

  it('should find all locations when no name is provided', async () => {
    const result = await service.findAll('');
    expect(result).not.toEqual([]);
  });

  it('should find one location by ID', async () => {
    const id = 1;
    const result = await service.findOne(id);
    expect(result).toBeDefined();
  });

  it("should return null if location does not exist", async () => {
    const result = await service.update(1, {
      name: "",
      city: "",
      state: "",
    });

    expect(result).toBeNull();
  });

  it("should remove a location", async () => {
    const id = 1;
    const result = await service.remove(id);
    expect(result).toEqual({ affected: 1, generatedMaps: [], raw: [] });
  });
});
