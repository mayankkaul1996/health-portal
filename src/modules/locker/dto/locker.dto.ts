import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsOptional, IsString, IsNotEmpty, IsEmail, IsInt } from "class-validator";


export class UploadToLockerDto {

    @ApiProperty({
        name: 'title',
        description: 'Title of the document',
        type: String,
        example: 'locker-document'
    })
    @IsString()
    readonly title: string;

}

export class GetDocumentsDto {

    @ApiProperty({
        name: 'search_term',
        description: 'Document Name',
        type: String,
        example: 'passport'
    })
    @IsString()
    @IsOptional()
    readonly searchTerm: string;

    @ApiProperty({
        name: 'lastSeenId',
        description: 'Last seen document id',
        type: String,
        example: 1
    })
    @IsString()
    @IsOptional()
    readonly lastSeenId: string;

    @ApiProperty({
        name: 'page_size',
        description: 'Page Size',
        type: Number,
        example: 10
    })
    @IsInt()
    @Transform(value => Number.parseInt(value.value))
    readonly pageSize: number = 10;

    @ApiProperty({
        name: 'sortField',
        description: 'The attribute to sort by',
        type: String,
        example: 'conversation.updated_at'
    })
    @IsOptional()
    readonly sortField: String;

    @ApiProperty({
        name: 'sortType',
        description: 'Sort 1|-1',
        type: Number,
        example: -1
    })
    @IsInt()
    @IsOptional()
    @Transform(value => Number.parseInt(value.value))
    readonly sortType: string;

};