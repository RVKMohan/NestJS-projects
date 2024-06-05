import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentDto } from './dto/student.dto';
import { ApiTags, ApiBody } from '@nestjs/swagger';


@ApiTags("student")
@Controller('student')
export class StudentController {
  constructor(private studentService: StudentService) {}

  @Get()
  async findAllStudent() {
    return await this.studentService.findAll();
  }

  @Post()
  @ApiBody({
    schema:{
      type:'object',
      properties: {
        firstName:{
          type: 'string'
        },
        lastName:{
          type: 'string'
        },
        email:{
          type: 'string'
        }
      }
    }
  })
  async createStudent(@Body() StudentDto: StudentDto) {
    const student = await this.studentService.create(StudentDto);
    return {
      statusCode: HttpStatus.OK,
     message: 'User created successfully',
     student
    }
  }

  @Get('byid/:id')
  async readStudent(@Param('id') id: number) {
    const data = await this.studentService.read(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'User fetched successfully',
      data,
    };
  }

  @Patch('updateByid/:id')
  @ApiBody({
    schema:{
      type:'object',
      properties: {
        firstName:{
          type: 'string'
        },
        lastName:{
          type: 'string'
        },
        email:{
          type: 'string'
        }
      }
    }
  })
  async updateStudent(@Param('id') id: number, @Body() StudentDto: Partial<StudentDto>) {
    await this.studentService.update(id, StudentDto);
    return {
        statusCode: HttpStatus.OK,
        message: 'User updated successfully',
      };
    }

  @Delete('deleteByid/:id')
  async removeStudent(@Param('id') id: number) {
    await this.studentService.remove(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'User deleted successfully',
    };
  }
}
