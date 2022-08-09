import { Req, UnauthorizedException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { PostCategory } from "./category.enum";
import { CreatePostDto } from "./dto-posts/create-post.dto";
import { post } from "./post.entity";
import { ContentType } from "./post_type.enum";

@EntityRepository(post)
export class PostRepository extends Repository<post> {

    async createPost(@Req() req, postDto: CreatePostDto): Promise<post> {

		const { content, type, description, category } = postDto;
		const new_post = new post();
		new_post.content = content;
		new_post.type = type;
		new_post.description = description;
		new_post.category = category;
		new_post.createdBy = req.user;
		new_post.createdAt = new Date();
		new_post.likes = 0;
		await new_post.save();
		return new_post;
	}

	async editPost(@Req() req, post_id: number, description: string): Promise<post> {

		const owner = req.user;
		const post = await this.findOne({ where: { id: post_id} });
		if (post.createdBy.id !== owner.id) {
			throw new UnauthorizedException("You are not allowed to edit this post");
		}
		post.description = description;
		await post.save();
		return post;
	}

}