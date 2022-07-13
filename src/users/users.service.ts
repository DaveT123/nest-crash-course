import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

  private users: User[] = [
    { id: 0, name: 'Marius' },
    { id: 1, name: 'Marius' },
    { id: 2, name: 'Dustin' }
  ];

  findAll(name?: string): User[] {

    // executes if name (optional) is provided
    if(name) {
      return this.users.filter(user => user.name === name);
    }
    
    return this.users;

  }

  findById(userId: number): User {

    return this.users.find(user => user.id === userId)

  }

  createUser(createUserDto: CreateUserDto): User {

    const newUser = { 
      id: Date.now(), 
      ...createUserDto
    };

    this.users.push(newUser);

    return newUser;

  }

  updateUser(userId: string, updateUserDto: UpdateUserDto): User {

    let updatedUser: UpdateUserDto;
    
    const updatedUserList = this.users.map(user => {
      
      // check if id exist and json string is not empty before replacing user data
      if(user.id === Number(userId) && Object.keys(updateUserDto).length !== 0) {

        updatedUser =  {
          id: Number(userId),
          ...updateUserDto
        };

        return updatedUser;

      }

      else {
        return user;
      }

    })

    this.users = updatedUserList;

    return updatedUser;

  }

} // end of class
