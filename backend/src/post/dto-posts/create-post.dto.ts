import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsNotEmpty, IsString, Length, Matches } from "class-validator";
import { PostCategory } from "../category.enum";
import { ContentType } from "../post_type.enum";

export class CreatePostDto {

	@ApiProperty({ type: [String] })
	@IsNotEmpty()
	@Matches(
		/^[a-zA-Z0-9_-]*$/,
		{ message: 'username must not contain special characters' },
	)
	content: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsIn(Object.values(ContentType))
	type: ContentType;

	@ApiProperty({ type: [String] })
	@IsNotEmpty()
	@Matches(
		/^[a-zA-Z0-9_-]*$/,
		{ message: 'username must not contain special characters' },
	)
	description: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsIn(Object.values(PostCategory))
	category: PostCategory;

}