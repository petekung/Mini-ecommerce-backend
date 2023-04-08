import { Entity, Column, PrimaryGeneratedColumn, OneToOne, ManyToOne, ManyToMany, JoinTable, JoinColumn, OneToMany } from 'typeorm';
import { Orders_details } from './orders_details.entity';
import { Sub_categories } from './sub_categories.entity';
@Entity()
export class Product {
    @PrimaryGeneratedColumn({ comment: 'ไอดีสินค้า' })
    id: number;

    @Column({
        nullable: true,
    })
    subId: string;

    @Column({ type: 'varchar', length: 11, comment: 'SKU/ID' })
    sku_id: string;

    @Column({ type: 'varchar', length: 255, comment: 'ชื่อสินค้า' })
    product_name: string;

    @Column({ type: 'text', comment: 'รายละเอียดสินค้า' })
    product_detail: string;

    @Column({ type: 'text', comment: 'รูปภาพสินค้า' })
    img_product: string;

    @Column({ type: 'int', comment: 'จำนวนสินค้า' })
    stock: number;

    @Column({ type: 'float', comment: 'ราคาสินค้า' })
    product_price: number;

    @OneToMany(() => Orders_details, (order_details) => order_details.products, { onDelete: "DEFAULT" })
    @JoinColumn()
    orderDetail: Orders_details
 
    @ManyToOne(() => Sub_categories, (sub_categories) => sub_categories.product)
    @JoinColumn({ name: "subId" ,referencedColumnName:"id"})
    subCate: Sub_categories



}