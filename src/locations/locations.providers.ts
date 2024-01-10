import { type DataSource } from "typeorm";
import { LocationEntity } from "./entities/location.entity";

export const LocationsProviders = [
  {
    provide: "LOCATION_REPOSITORY",
    useFactory: (dataSource: DataSource) => dataSource.getRepository(LocationEntity),
    inject: ["DATA_SOURCE"],
  },
];