import { Repository } from "typeorm";
import { PostCategory } from "./category.enum";
import { post } from "./post.entity";
import { PostType } from "./post_type.enum";
export declare class PostRepository extends Repository<post> {
    createPost(req: any, content: string, type: PostType, description: string, category: PostCategory): Promise<post>;
    editPost(req: any, post_id: number, description: string): Promise<post>;
}
