import { Profile } from '../users/user.entity';
import { PostCategory } from './category.enum';
import { post } from './post.entity';
import { PostRepository } from './post.repository';
import { PostType } from './post_type.enum';
export declare class PostService {
    private readonly postRepository;
    constructor(postRepository: PostRepository);
    getPosts(): Promise<post[]>;
    getPostByCategory(category: PostCategory): Promise<post[]>;
    getUserPosts(user: Profile): Promise<post[]>;
    getPostById(post_id: number): Promise<post>;
    createPost(req: any, content: string, type: PostType, description: string, category: PostCategory): Promise<post>;
    editPost(req: any, post_id: number, description: string): Promise<post>;
    deletePost(req: any, post_id: number): Promise<void>;
}
