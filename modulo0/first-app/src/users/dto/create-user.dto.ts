import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty({ message: 'El email es requerido' })
    @IsEmail({}, { message: 'El email es invalido' })
    email: string;

    @IsString()
    @IsNotEmpty({ message: 'La contraseña es requerida' })
    @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
    password: string;

    @IsOptional()
    @IsNumber()
    dni?: number

    @IsBoolean()
    @IsOptional()
    isActive?: boolean
}
