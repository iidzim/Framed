import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, Matches } from "class-validator";

export class EditPostDto {

	@ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    post_id: number;

	@ApiProperty({ type: [String] })
	@IsNotEmpty()
	@Matches(
		/^[a-zA-Z0-9_-]*$/,
		{ message: 'username must not contain special characters' },
	)
	description: string;

}