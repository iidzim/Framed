import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, Matches } from "class-validator";

export class EditProfileDto {

	@ApiProperty({ type: [String], required: false })
	@IsNotEmpty()
	@IsOptional()
	@Matches(
		/^[a-zA-Z\s]{5,20}$/,
		{ message: 'fullname must not contain special characters' },
	)
	fullname: string;

	@ApiProperty({ type: [String], required: false })
	@IsNotEmpty()
	@IsOptional()
	@Matches(
		/^[a-zA-Z0-9_-]{5,20}$/,
		{ message: 'username must not contain special characters' },
	)
	username: string;

	@ApiProperty({ type: [String], required: false })
	@IsNotEmpty()
	@IsOptional()
	@Matches(
		/^[a-zA-Z0-9_-\s]{8,}$/,
		{ message: "Password too weak / must not contain special characters" },
	)
	old_password: string;

	@ApiProperty({ type: [String], required: false })
	@IsNotEmpty()
    @IsOptional()
	@Matches(
		/^[a-zA-Z0-9_-\s]{8,}$/,
		{ message: "Password too weak / must not contain special characters" },
	)
	new_password: string;

	@ApiProperty({ type: [String], required: false })
	@IsNotEmpty()
    @IsOptional()
    @IsEmail()
    email: string;

	@ApiProperty({ type: [String], required: false })
	@IsNotEmpty()
    @IsOptional()
    fileName: string;
}