import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';
import { StudentDto } from './dto/student.dto';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentsRepository: Repository<Student>,
  ){}

  async create(data: StudentDto) {
    const student = this.studentsRepository.create(data);
    await this.studentsRepository.save(data);
    return student;
  }

  async findAll(): Promise<Student[]> {
    return await this.studentsRepository.find();
  }

  async read(id: number) {
    return await this.studentsRepository.findOne({where: {id: id}});
  }

  async update(id: number, StudentDto: Partial<StudentDto>) {
    await this.studentsRepository.update({id}, StudentDto);
    return await this.studentsRepository.findOne({where: {id: id}});
  }

  async remove(id: number) {
    await this.studentsRepository.delete({id});
    return {deleted: true};
  }
}
