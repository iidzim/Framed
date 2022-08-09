import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";

export class CreateProfileDto {

	@IsNotEmpty()
	@IsString()
	@Matches(
		/^[a-zA-Z\s]{5,20}$/,
		{ message: 'fullname must not contain special characters' },
	)
	fullname: string;

	@IsNotEmpty()
	@IsString()
	@Matches(
		/^[a-zA-Z0-9_-]{5,20}$/,
		{ message: 'username must not contain special characters' },
	)
	username: string;

	@IsNotEmpty()
	@IsEmail()
	email: string;

	@IsNotEmpty()
	@Matches(
		/^[a-zA-Z0-9_-\s]{8,}$/,
		{ message: "Password too weak: at least 8 characters / must not contain special characters" },
	)
	password: string;
}