import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Follower } from "../followers/follower.entity";
import { Post } from "../post/post.entity";
import { Profile } from "../users/user.entity";

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'test',
    password: 'test',
    database: 'test_db',
    entities: [
        Profile,
        Post,
        Follower,
    ],
    synchronize: true,
    logging: false,
    autoLoadEntities : true,
}
