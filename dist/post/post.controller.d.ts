import { UsersService } from '../users/users.service';
import { PostCategory } from './category.enum';
import { post } from './post.entity';
import { PostService } from './post.service';
import { PostType } from './post_type.enum';
export declare class PostController {
    private readonly postService;
    private readonly usersService;
    constructor(postService: PostService, usersService: UsersService);
    getPosts(req: any): Promise<post[]>;
    getPostById(req: any, post_id: number): Promise<post>;
    getPostByCategory(req: any, category: PostCategory): Promise<post[]>;
    getUserPosts(req: any): Promise<post[]>;
    createPost(req: any, content: string, type: PostType, description: string, category: PostCategory): Promise<post>;
    editPost(req: any, post_id: number, description: string): Promise<post>;
    deletePost(req: any, post_id: number): Promise<void>;
}
