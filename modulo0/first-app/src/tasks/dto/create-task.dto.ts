import { IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { TaskStatus } from "../entities/task.entity";

export class CreateTaskDto {
    @IsString()
    @IsNotEmpty({ message: 'El titulo es obligatorio' })
    @MinLength(3, { message: 'El titulo debe tener almenos 3 caracteres' })
    title: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsEnum(TaskStatus, { message: 'El estado no es valido' })
    @IsOptional()
    status?: TaskStatus;
}
