import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeDto } from './dto/employee.dto';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { Res } from '@nestjs/common';

@ApiTags("Employee")
@Controller('employee')
export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}

  @Post()
  @ApiBody({
    schema:{
      type:'object',
      properties: {
        firstname:{
          type: 'string'
        },
        middlename:{
          type: 'string'
        },
        lastname:{
          type: 'string'
        },
        emailid:{
          type: 'string'
        },
        phonenumber:{
          type: 'string'
        },
        address:{
          type: 'string'
        },
        gender:{
          type: 'string'
        },
        dateofbirth:{
          type: 'string'
        },
      }
    }
  })
  async createEmployee(@Body() EmployeeDto: EmployeeDto) {
    const employee = await this.employeeService.create(EmployeeDto);
    return {
      statusCode: HttpStatus.OK,
     message: 'User created successfully',
     employee
    }
  }

  @Get()
  async findAllEmployee(@Res() res) {
    const ALLemployees = await this.employeeService.findAll();
    res.status(HttpStatus.OK).json(Array.isArray(ALLemployees) ? ALLemployees : [ALLemployees]);
    return {
      statusCode: HttpStatus.OK,
      message: 'Users fetched successfully',
      ALLemployees
    };
  }


  

  @Get('getBy/:id')
  async readEmployee(@Param('id') id: number) {
    const data = await this.employeeService.read(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'User fetched successfully',
      data,
    };
  }

  @Patch('patchBy/:id')
  @ApiBody({
    schema:{
      type:'object',
      properties: {
        firstname:{
          type: 'string'
        },
        middlename:{
          type: 'string'
        },
        lastname:{
          type: 'string'
        },
        emailid:{
          type: 'string'
        },
        phonenumber:{
          type: 'string'
        },
        address:{
          type: 'string'
        },
        dateofbirth:{
          type: 'string'
        },
      }
    }
  })
  async updateEmployee(@Param('id') id: number, @Body() EmployeeDto: EmployeeDto) {
    await this.employeeService.update(id, EmployeeDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'User updated successfully',
    };
  }

  @Delete('removeBy/:id')
  async removeemployee(@Param('id') id: number) {
    await this.employeeService.remove(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'User deleted successfully',
    };
  }
}
