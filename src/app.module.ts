import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { StudentModule } from './student/student.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './student/entities/student.entity';
import { DataSource } from 'typeorm';
import { UsersModule } from './users/users.module';
import { UsersEntity } from './users/entities/user.entity';

import { EmployeeModule } from './employee/employee.module';
import { Employee } from './employee/entities/employee.entity';
import { TodoModule } from './todo/todo.module';
import { Todo } from './todo/entities/todo.entity';
import { ProductsModule } from './products/products.module';
import { Child, Parent } from './products/entities/products.entity';
// import { VehicleModule } from './vehicle/vehicle.module';
// import { Vehicle } from './vehicle/entities/vehicle.entity';

@Module({
  imports: [ TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'students',
    entities: [ UsersEntity, Student, Employee, Todo, Parent, Child, ],
    synchronize: true,
    logging:true,
    connectTimeout: 10000,
  }), UsersModule, StudentModule, EmployeeModule, TodoModule, ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
