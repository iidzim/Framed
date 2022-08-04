import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Profile } from "../users/user.entity";

@Entity('follower')
export class Follower extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    receiver: number;

    @ManyToOne(type => Profile, user => user.senders)
    sender: Profile;
}