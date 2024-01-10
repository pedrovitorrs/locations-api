import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  HttpStatus,
  Delete,
  Put,
  Res,
  NotFoundException,
  Query,
} from "@nestjs/common";
import { Response } from "express";
import { LocationsService } from './locations.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "../auth/auth-guard";
import { UpdateLocationDto } from "./dto/update-location.dto";

@ApiTags("locations")
@Controller("api/locations")
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Post()
  create(@Body() createLocationDto: CreateLocationDto) {
    return this.locationsService.create(createLocationDto);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get()
  @ApiQuery({
    name: "name",
    type: String,
    description: "Optional",
    required: false
  })
  findAll(@Query("name") name: string = "") {
    return this.locationsService.findAll(name);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.locationsService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.locationsService.remove(+id);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() updateLanguageDto: UpdateLocationDto,
    @Res() response: Response,
  ) {
    const update = await this.locationsService.update(+id, updateLanguageDto);

    if (!update) {
      throw new NotFoundException();
    }

    return response.status(HttpStatus.OK).json(update);
  }
}
