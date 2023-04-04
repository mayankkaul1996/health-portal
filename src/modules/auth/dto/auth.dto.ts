import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl } from "class-validator";
import { UserDocument } from "src/modules/user/schemas/user.schema";

export class AuthResponseDTO {
    user: UserDocument;
    accessToken: string
}

export class GoogleSigninRequestDTO {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        name: 'accessToken',
        description: 'the access token issued by the identity provider',
        type: String,
        example: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.POstGetfAytaZS82wHcjoTyoqhMyxXiWdR7Nn7A29DNSl0EiXLdwJ6xC6AfgZWF1bOsS_TuYI3OG85AmiExREkrS6tDfTQ2B3WXlrr-wp5AokiRbz3_oB4OxG-W9KcEEbDRcZc0nH3L7LzYptiy1PtAylQGxHTWZXtGz4ht0bAecBgmpdgXMguEIcoqPJ1n3pIWk_dUZegpqx0Lka21H6XxUTxiy8OcaarA8zdnPUnV6AmNP3ecFawIFYdvJB_cm-GvpCSbr8G8y_Mllj8f4x9nBH8pQux89_6gUY618iYv7tuPWBFfEbLxtF2pZS6YC1aSfLQxeNe8djT9YjpvRZA'
    })
    readonly accessToken: string;

    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({
        name: 'email',
        description: 'Email ID of the user',
        type: String,
        example: 'michael.scott@dundermifflin.com'
    })
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        name: 'firstName',
        description: 'First name of the user',
        type: String,
        example: 'Michael'
    })
    readonly firstName: string;

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    @ApiProperty({
        name: 'lastName',
        description: 'Last name of the user',
        type: String,
        example: 'developer'
    })
    readonly lastName?: string;

    @IsUrl()
    @IsOptional()
    @ApiProperty({
        name: 'avatarUrl',
        description: 'URL of online avatar (could be provided by idp)',
        type: String,
        example: 'https://idp.com/avatar.jpg'
    })
    readonly avatarUrl?: string;

}