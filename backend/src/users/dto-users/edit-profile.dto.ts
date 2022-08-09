import { IsEmail, IsOptional, Matches } from "class-validator";

export class EditProfileDto {

	@IsOptional()
	@Matches(
		/^[a-zA-Z\s]{5,20}$/,
		{ message: 'fullname must not contain special characters' },
	)
	fullname: string;

	@IsOptional()
	@Matches(
		/^[a-zA-Z0-9_-]{5,20}$/,
		{ message: 'username must not contain special characters' },
	)
	username: string;

	@IsOptional()
	@Matches(
		/^[a-zA-Z0-9_-\s]{8,}$/,
		{ message: "Password too weak / must not contain special characters" },
	)
	old_password: string;

    @IsOptional()
	@Matches(
		/^[a-zA-Z0-9_-\s]{8,}$/,
		{ message: "Password too weak / must not contain special characters" },
	)
	new_password: string;

    @IsOptional()
    @IsEmail()
    email: string;

    @IsOptional()
    fileName: string;
}