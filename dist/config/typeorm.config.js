"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOrmConfig = void 0;
const user_entity_1 = require("../users/user.entity");
exports.typeOrmConfig = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'test',
    password: 'test',
    database: 'test_db',
    entities: [user_entity_1.Profile],
    synchronize: true,
    logging: false,
    autoLoadEntities: true,
};
//# sourceMappingURL=typeorm.config.js.map