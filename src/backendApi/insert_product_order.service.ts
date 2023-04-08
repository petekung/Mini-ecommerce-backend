import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateInsertProductOrderDto } from './dto/create-insert_product_order.dto';
import { UpdateInsertProductOrderDto } from './dto/update-insert_product_order.dto';
import { In, Index, InsertResult, Not, Repository } from 'typeorm';
import { ProductOrderStatus, Orders } from './entities/orders.entity';
import { Product } from './entities/product.entity';
import { Delivery } from './entities/delivery.entity';
import { Orders_details } from './entities/orders_details.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { query } from 'express';


@Injectable()
export class InsertProductOrderService {
  constructor(
    @InjectRepository(Product)
    private ProductRepository: Repository<Product>,
    @InjectRepository(Delivery)
    private deliveryRepository: Repository<Delivery>,
    @InjectRepository(Orders_details)
    private order_listRepository: Repository<Orders_details>,
    @InjectRepository(Orders)
    private proDuctOrderRepository: Repository<Orders>,
  ) { }



  async create(createInsertProductOrderDto: CreateInsertProductOrderDto) {
   // console.log(createInsertProductOrderDto.quantiy)
    const orders = []
    const quantiys = []
    let number = 0
    for (const productId of createInsertProductOrderDto.product_id) {
      const order1 = new Orders_details()
      order1.productId = productId
      orders.push(order1)
      order1.quantiy = createInsertProductOrderDto.quantiy[number]
      orders.push(order1)
      
      // console.log(productId)
      number++
    }
    const product1 = new Orders()
    product1.total_price = createInsertProductOrderDto.total_price
    product1.delivery_id = createInsertProductOrderDto.delivery_id
    product1.userId = createInsertProductOrderDto.userId  //add data with relation one to many
    product1.orderList = orders
    product1.payment_status = createInsertProductOrderDto.payment_status
    return  this.proDuctOrderRepository.save(product1)
  }


  findAll(): Promise<Product[]> {
    return this.ProductRepository.find();
  }

  findOne(order_id: number): Promise<Orders> {
    return this.proDuctOrderRepository.findOne({
      where: { id: order_id },
      relations: ["orderList", "orderList.products"]

    });
  }
  findDelivery() {
    return this.deliveryRepository.find();
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} attration`;
  //   return this.product_orderRepository.findOneBy( id );
  // }

  // update(id: number, updateInsertProductOrderDto: UpdateInsertProductOrderDto) {
  //   return this.proDuctOrderRepository.update(id, updateInsertProductOrderDto);
  // }

  async remove(id: string): Promise<void> {
    await this.proDuctOrderRepository.delete(id);
  }
}