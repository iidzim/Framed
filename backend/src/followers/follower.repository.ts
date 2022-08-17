import { EntityRepository, Repository } from "typeorm";
import { Profile } from "../users";
import { Follower } from "./follower.entity";

@EntityRepository(Follower)
export class FollowerRepository extends Repository<Follower> {

    async getFollowers(id: number): Promise<Follower[]> {
        return await this.find({ where: { receiver: id } });
    }

    async getFollowing(user: Profile): Promise<Follower[]> {
        return await this.find({ where: { sender: user } });
    }

    async follow(user: Profile, following: Profile): Promise<Follower> {

        const exist = await this.findOne({ where: { sender: user, receiver: following.id } });
        if (exist) {
            return exist;
        }
        const follower = new Follower();
        follower.sender = user;
        follower.receiver = following.id;
        await follower.save();
        return follower;
    }
}