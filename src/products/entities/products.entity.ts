import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';

@Entity('parent')
export class Parent {
    @PrimaryGeneratedColumn()
    c_id: number;

    @Column()
    category:string;

    @Column()
    model:string;

    @OneToMany(() => Child, (child) => child.parent,{cascade:true})
    child: Child[];
}



@Entity('child')
export class Child {
    @PrimaryGeneratedColumn()
    i_id: number;

    @Column()
    item:string;

    @Column()
    itemprice:string;

    @Column({name: 'c_id'})
    categoryId: number;

    @ManyToOne(() => Parent, (parent) => parent.child)
    @JoinColumn({name: 'c_id'})
    parent: Parent;
}
