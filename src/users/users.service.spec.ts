import { Test, type TestingModule } from "@nestjs/testing";
import { databaseProviders } from "../database.providers";
import { UserProviders } from "./users.providers";
import { UsersService } from "./users.service";

describe("UsersService", () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, ...UserProviders, ...databaseProviders],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
