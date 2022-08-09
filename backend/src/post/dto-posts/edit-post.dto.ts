import { IsNotEmpty, IsNumber, Matches } from "class-validator";

export class EditPostDto {

    @IsNotEmpty()
    @IsNumber()
    post_id: number;

	@IsNotEmpty()
	@Matches(
		/^[a-zA-Z0-9_-]*$/,
		{ message: 'username must not contain special characters' },
	)
	description: string;

}