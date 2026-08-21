import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
    @IsString()
    @IsOptional()
    readonly name?: string;

}
