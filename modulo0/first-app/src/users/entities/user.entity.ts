import { UUID } from "crypto";
import { Task } from "src/tasks/entities/task.entity";

export class User {
    id: UUID;
    email: string;
    password: string;
    dni?: number
    isActive: boolean
    tasks: Task[]
}
