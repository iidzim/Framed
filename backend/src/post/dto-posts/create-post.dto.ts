import { IsIn, IsNotEmpty, IsString, Length, Matches } from "class-validator";
import { PostCategory } from "../category.enum";
import { ContentType } from "../post_type.enum";

export class CreatePostDto {

	@IsNotEmpty()
	@Matches(
		/^[a-zA-Z0-9_-]*$/,
		{ message: 'username must not contain special characters' },
	)
	content: string;

	@IsNotEmpty()
	@IsIn(Object.values(ContentType))
	type: ContentType;

	@IsNotEmpty()
	@Matches(
		/^[a-zA-Z0-9_-]*$/,
		{ message: 'username must not contain special characters' },
	)
	description: string;

	@IsNotEmpty()
	@IsIn(Object.values(PostCategory))
	category: PostCategory;

}