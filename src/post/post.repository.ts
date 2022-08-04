import { EntityRepository } from "typeorm";
import { Post } from "./post.entity";

@EntityRepository(Post)
export class PostRepository {

    // async getPosts(): Promise<Post[]> {
        
    // }
}