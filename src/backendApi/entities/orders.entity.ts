import { Entity, Column, PrimaryGeneratedColumn, OneToMany ,Generated } from 'typeorm';
import { Orders_details } from './orders_details.entity';
export enum payment_stat {
    approve ,
    reject 
   
  }
export enum order_status{
    เตรียมสินค้า,
    กำลังจัดส่ง,
    ได้รับสินค้าแล้ว,
}
export enum ProductOrderStatus {
    WAITING_PAYMENT = 'WAITING_PAYMENT',
    DELETED = 'DELETED',
    COMPLETED = 'COMPLETED'
}
@Entity({name:"orders"})
export class Orders {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: '11' })
    delivery_id: string;

    @Column({ type: 'varchar', length: '50', nullable: true })
    customer_fname: string;

    @Column({ type: 'varchar', length: '50', nullable: true })
    customer_lname: string;

    @Column({ type: 'varchar', length: '10', nullable: true })
    tel: string;

    @Column({ type: 'varchar', length: '255', nullable: true })
    email: string;

    @Column({ type: 'text', nullable: true })
    address: string;

    @Column({ type: 'float', nullable: true })
    total_price: number;

    @Column({ type: 'text', nullable: true })
    img_bill: string;

    @Column('int')
    payment_status: payment_stat;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    timestamps: Date;

    @Column()
    @Generated("uuid")
    uuid: string

    @Column({nullable:true})
    userId:string
    
    @OneToMany(() => Orders_details, (order_list) => order_list.productOrder,{cascade:true})
    orderList: Orders_details[];
 
    
    @Column({ type: 'enum', enum: [ProductOrderStatus.DELETED, ProductOrderStatus.COMPLETED, ProductOrderStatus.WAITING_PAYMENT], default: ProductOrderStatus.WAITING_PAYMENT })
    order_status: ProductOrderStatus;
}

