import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Delivery {
    @PrimaryGeneratedColumn({ comment: 'ไอดี' })
    id : number;

    @Column({ type: 'varchar', length: 100, comment: 'ชื่อขนส่ง' })
    delivery_name: string;
    
}