import { validateHeaderValue } from 'http';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({comment:"ไอดีจากไลน์" }) 
    userId:string 
}