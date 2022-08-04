"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOrmConfig = void 0;
const follower_entity_1 = require("../followers/follower.entity");
const post_entity_1 = require("../post/post.entity");
const user_entity_1 = require("../users/user.entity");
exports.typeOrmConfig = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'test',
    password: 'test',
    database: 'test_db',
    entities: [
        user_entity_1.Profile,
        post_entity_1.Post,
        follower_entity_1.Follower,
    ],
    synchronize: true,
    logging: false,
    autoLoadEntities: true,
};
//# sourceMappingURL=typeorm.config.js.map