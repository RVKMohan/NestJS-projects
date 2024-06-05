import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  activity: string;

  @Column()
  status: string;

  @Column()
  datetocomplete: string;

  @Column()
  startdate: string;
  
  @Column()
  starttime: string;

  @Column()
  completeddate: string;

  @Column()
  completedtime: string;

  

}

