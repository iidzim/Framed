import { Repository } from "typeorm";
import { Profile } from "./user.entity";
export declare class UserRepository extends Repository<Profile> {
    findById(id: number): Promise<Profile>;
    findByEmail(email: string): Promise<Profile>;
    findByUsername(username: string): Promise<Profile>;
    findByfullName(fullname: string): Promise<Profile>;
    signUp(fullname: string, username: string, email: string, password: string): Promise<any>;
    validatePassword(username: string, password: string): Promise<any>;
}
