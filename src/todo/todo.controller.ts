import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoDto } from './dto/todo.dto';
import { Res } from '@nestjs/common';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  async createTodo(@Body() TodoDto: TodoDto) {
    const todo = await this.todoService.create(TodoDto);
    return {
      statusCode: HttpStatus.OK,
     message: 'todo created successfully',
     todo
    }
  }

  @Get()
  async findAllTodo(@Res() res) {
    const allTodos = await this.todoService.findAll();
    res.status(HttpStatus.OK).json(Array.isArray(allTodos) ? allTodos : [allTodos]);
    return {
      statusCode: HttpStatus.OK,
      message: 'Todos fetched successfully',
      allTodos
    };
  }

  
  @Patch('update/:id')
  async updateTodo(@Param('id') id: number, @Body() TodoDto: TodoDto) {
    await this.todoService.update(id, TodoDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Todo updated successfully',
    };
  }


}