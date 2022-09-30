import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Follower } from "../followers/follower.entity";
import { post } from "../post/post.entity";
import { Profile } from "../users/user.entity";
import * as dotenv from "dotenv";
dotenv.config({ path: `.env` });

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: "postgres",
	host: process.env.HOST || "localhost",
	port: 5432,
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	entities: [Profile, post, Follower],
	synchronize: true,
	logging: false,
	autoLoadEntities: true,
};

//- Setting synchronize makes sure your entities will be synced with the database, every time you run the application.
//- Setting logging to true will log all the queries and errors you make to the console.
//- Setting autoLoadEntities to true will automatically load all the entities in the entities array.