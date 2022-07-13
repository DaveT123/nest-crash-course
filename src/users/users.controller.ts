import { Body, Controller, Get, NotFoundException, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, UpdateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@ApiTags('users') // OpenAPI
@Controller('users')
export class UsersController {
  
  constructor(private userService: UsersService) {}

  @ApiOkResponse({type: User, isArray: true}) // OpenAPI - display example of expected response
  @ApiQuery({name: 'name', required: false}) // OpenAPI - optional property
  @Get()
  getUsers(@Query('name') name?: string): User[] { 
    return this.userService.findAll(name); 
  }

  @ApiOkResponse({type: User}) // OpenAPI - display example of expected response
  @ApiNotFoundResponse() // OpenAPI - display error code if no response
  @Get('/:id')
  getUserById(@Param('id', ParseIntPipe) id: number): User {

    console.log('--->', typeof id);

    const user = this.userService.findById(id);

    if(!user) {
      throw new NotFoundException();
    }

    return user;

  }

  @ApiCreatedResponse({type: User}) // OpenAPI - display example of expected object to be created
  @ApiBadRequestResponse() // OpenAPI
  @Post()
  createUser(@Body() body: CreateUserDto): User {
    return this.userService.createUser(body);
  }

  @ApiCreatedResponse({type: User}) // OpenAPI - display example of expected object to be created
  @Put('/:id')
  updateUser(
    @Param('id') id: string,
    @Body() body: UpdateUserDto
  ): UpdateUserDto {
    
    return this.userService.updateUser(id, body);
  
  }

}
