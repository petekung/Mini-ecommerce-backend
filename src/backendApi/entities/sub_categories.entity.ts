import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToOne } from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class Sub_categories {
    @PrimaryGeneratedColumn({ comment: 'ไอดีรายการ' })
    id: number;

    @Column({ type: 'varchar', length: 11, comment: 'ไอดีหมวดหมู่' })
    cate_id: string;

    @Column({ type: 'varchar', length: 255, comment: 'ชื่อรายการสินค้า' })
    sub_category_name: string;

    @OneToMany(()=>Product,(product)=>product.subCate)
    @JoinColumn()
    product:Product[]

}