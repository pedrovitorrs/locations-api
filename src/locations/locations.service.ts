import { Inject, Injectable } from "@nestjs/common";
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Repository } from "typeorm";
import { LocationEntity } from "./entities/location.entity";

@Injectable()
export class LocationsService {
  constructor(
    @Inject("LOCATION_REPOSITORY")
    private readonly locationsRepository: Repository<LocationEntity>,
  ) {}

  async create(createLocationDto: CreateLocationDto) {
    const location =  this.locationsRepository.create(createLocationDto)
    await this.locationsRepository.save(location);
    return {
      id: location.id,
      ...createLocationDto,
    };
  }

  async findAll(name: string) {
    let queryBuilder = this.locationsRepository.createQueryBuilder();

    if (name) {
      queryBuilder = queryBuilder.where("name LIKE :name", { name: `%${name}%` });
    }
  
    return await queryBuilder.getMany();
  }

  async findOne(id: number) {
    return await this.locationsRepository.findOne({ where: { id } });
  }

  async findByName(name: string) {
    return await this.locationsRepository.findOne({ where: { name } });
  }

  async update(id: number, updateDto: UpdateLocationDto) {
    const update = await this.locationsRepository.findOne({
      where: { id },
    });

    if (!update) {
      return null;
    }

    // Atualize apenas os campos fornecidos no DTO
    Object.assign(update, updateDto);

    return await this.locationsRepository.update(id, updateDto);
  }

  async remove(id: number) {
    return await this.locationsRepository
    .createQueryBuilder("locationEntity")
    .softDelete()
    .from(LocationEntity)
    .where({ id: id })
    .execute();
  }
}
