import { Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

const MOCK_USERS: User[] = [
  {
    _id: 'abc123',
    email: 'john@example.com',
    password: 'vhajsdkf21@hz[a',
    role: 'user',
    name: 'John',
    createdAt: new Date('2020-02-12T01:57:45.271Z'),
    updatedAt: new Date('2020-02-12T01:57:45.271Z'),
  },
  {
    _id: 'def010',
    email: 'aaron@example.com',
    password: 'vhajsdkf21@hz[a',
    role: 'user',
    createdAt: new Date('2021-03-14T03:11:45.271Z'),
    updatedAt: new Date('2021-03-14T03:11:45.271Z'),
  },
];

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto) {
    const { email, name, password } = createUserDto;
    const newUser = {
      email,
      password,
      name,
      _id: randomBytes(4).toString('hex'),
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    MOCK_USERS.push(newUser);
    return newUser;
  }

  findAll() {
    return MOCK_USERS;
  }

  findOne(id: string) {
    return MOCK_USERS.find(({ _id }) => _id === id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const userIdx = MOCK_USERS.findIndex(({ _id }) => _id === id);
    const user = MOCK_USERS.splice(userIdx, 1)[0];
    const { email, name, password } = updateUserDto;
    const updatedUser = { ...user, email, name, password };
    MOCK_USERS.push(updatedUser);
    return updatedUser;
  }

  remove(id: string) {
    const userIdx = MOCK_USERS.findIndex(({ _id }) => _id === id);
    const user = MOCK_USERS.splice(userIdx, 1)[0];
    return user;
  }
}
