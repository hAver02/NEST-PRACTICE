import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { User } from './user.model';

@Injectable()
export class UsersService {
    private users: User[] = [{ id: randomUUID(), name: 'Luciano', email: 'luciano@gmail.com' }]



}
