import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Categories {
    @PrimaryGeneratedColumn({ comment: 'ไอดี' })
    id  : number;

    @Column({ type: 'varchar', length: 255, comment: 'ชื่อหมวดหมู่' })
    category_name: string;
    
}