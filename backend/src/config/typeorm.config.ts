import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Follower } from "../followers/follower.entity";
import { post } from "../post/post.entity";
import { Profile } from "../users/user.entity";

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'test_db',
    entities: [
        Profile,
        post,
        Follower,
    ],
    synchronize: true,
    logging: false,
    autoLoadEntities : true,
}
