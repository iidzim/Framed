import { IsAlphanumeric, IsNotEmpty, IsNotIn, IsString, Length, Matches } from "class-validator";

export class ValidLoginDto {
    @IsNotEmpty()
	@Matches(
		/^[a-zA-Z0-9_-]{5,20}$/,
		{ message: 'username must not contain special characters' },
	)
	username: string;

	@IsNotEmpty()
	@Matches(
		/^[a-zA-Z0-9_-\s]{8,}$/,
		{ message: "Password too weak / must not contain special characters" },
	)
	password: string;
}