
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  middlename: string;

  @Column()
  lastname: string;

  @Column()
  emailid: string;
  
  @Column()
  phonenumber: string;

  @Column()
  address: string;

  @Column()
  gender: string;

  @Column()
  dateofbirth: string;

}
