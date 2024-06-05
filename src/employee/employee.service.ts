import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { EmployeeDto } from './dto/employee.dto';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeesRepository: Repository<Employee>,
  ){}

  async findAll(): Promise<Employee[]> {
    return await this.employeesRepository.find();
  }
   
  async create(data: EmployeeDto) {
    const employeeData = this.employeesRepository.create(data);
    await this.employeesRepository.save(data);
    return employeeData;
  }

  async read(id: number) {
    return await this.employeesRepository.findOne({where:{id: id}});
  }

  async update(id: number, EmployeeDto: Partial<EmployeeDto>) {
    await this.employeesRepository.update({id}, EmployeeDto);
    return await this.employeesRepository.findOne({where:{id: id}});
  }

  async remove(id: number) {
    await this.employeesRepository.delete({id});
    return {deleted: true};
  }
}
