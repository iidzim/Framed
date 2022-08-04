import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Profile } from "../users/user.entity";

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'test',
    password: 'test',
    database: 'test_db',
    entities: [ Profile ],
    synchronize: true,
    logging: false,
    autoLoadEntities : true,
}
