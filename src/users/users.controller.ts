import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersDTO } from './dto/users.dto';
import { ApiTags, ApiBody } from '@nestjs/swagger';

@ApiTags('users Test Module')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}


  @Get()
  async showAllUsers() {
    const users =  await this.usersService.showAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'Users fetched successfully',
      users
    };
  }
  
  @Post()
  @ApiBody({
    schema:{
      type:'object',
      properties: {
        name:{
          type: 'string'
        },
        email:{
          type: 'string'
        },
        password:{
          type: 'string'
        }
      }
    }
  })
  async createUsers(@Body() userdto: UsersDTO) {
    const user = await this.usersService.create(userdto);
   return {
     statusCode: HttpStatus.OK,
     message: 'User created successfully',
     user
   };
 }

  

 @Get('email/:email')
 async findByEmailUser(@Param('email') email: string) {
   const data =  await this.usersService.findByEmail(email);
   return {
     statusCode: HttpStatus.OK,
     message: 'User fetched successfully',
     data,
   };
 }

  @Get('id/:id')
  async readUser(@Param('id') id: number) {
    const data =  await this.usersService.read(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'User fetched successfully',
      data,
    };
  }

  
@Patch('update/:id')
@ApiBody({
  schema:{
    type:'object',
    properties: {
      name:{
        type: 'string'
      },
      email:{
        type: 'string'
      },
      password:{
        type: 'string'
      }
    }
  }
})
  async updateUser(@Param('id') id: number, @Body() data: Partial<UsersDTO>) {
    await this.usersService.update(id, data);
    return {
      statusCode: HttpStatus.OK,
      message: 'User updated successfully',
    };
  }


  @Delete('delete/:id')
   async deleteUser(@Param('id') id: number) {
        await this.usersService.destroy(id);
        return {
          statusCode: HttpStatus.OK,
          message: 'User deleted successfully',
        };
      }
    }