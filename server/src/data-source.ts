import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Note } from "./entity/Note";

export let AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "password",
  database: "ainotedb",
  synchronize: true,
  logging: true,
  entities: [User, Note],
  subscribers: [],
  migrations: [],
});
