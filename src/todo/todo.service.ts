import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { TodoDto } from './dto/todo.dto';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todosRepository: Repository<Todo>,
  ){}

  async create(data: TodoDto) {
    const todoData = this.todosRepository.create(data);
    await this.todosRepository.save(data);
    return todoData;
  }

  async findAll(): Promise<TodoDto[]> {
    return await this.todosRepository.find();
  }

  async update(id: number, TodoDto: Partial<TodoDto>) {
    await this.todosRepository.update({id}, TodoDto);
    return await this.todosRepository.findOne({where:{id: id}});
    }
  }


