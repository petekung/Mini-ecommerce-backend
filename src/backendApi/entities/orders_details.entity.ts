import { type } from 'os';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, ManyToOne, JoinColumn,ManyToMany, JoinTable } from 'typeorm';
import { Product } from './product.entity';
import { Orders } from './orders.entity';

@Entity()
export class Orders_details {
    @PrimaryGeneratedColumn({comment: 'ไอดีรายการออร์เดอร์'})
    id: number;

    @Column({ type: 'varchar', length: 10, comment: 'จำนวน' })
    quantiy: string;

    @Column()
    orderId:string

    @Column()
    productId:string



    @ManyToOne(()=> Orders,(product_order)=>product_order.orderList)
    @JoinColumn({name:"orderId", referencedColumnName:"id"})
    productOrder : Orders

    @ManyToOne(() => Product,(product)=>product.orderDetail,{onDelete:"CASCADE"})
    @JoinColumn({name:"productId", referencedColumnName:"id"})
    products:Product[]
  
}