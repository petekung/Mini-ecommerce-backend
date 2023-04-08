import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Orders_details } from './entities/orders_details.entity';
import { Repository, Not, And } from 'typeorm';

import { ProductOrderStatus, Orders } from './entities/orders.entity';

@Injectable()
export class Order_listService {
  constructor(
    @InjectRepository(Orders_details)
    private order_listRepository: Repository<Orders_details>,

    @InjectRepository(Orders)
    private proDuctOrderRepository: Repository<Orders>,

    // @InjectRepository(product)
    // private proDuctRepository: Repository<product>,
  ) { }


  findAll() {
    return this.proDuctOrderRepository.find({
      where: { order_status:  Not(ProductOrderStatus.DELETED) },
      relations: ["orderList","orderList.products"],
      order: {
        id: { direction:"DESC"}
    }
      

    });
  }
  findOne(order_id: number): Promise<Orders> {
    return this.proDuctOrderRepository.findOne({
      where: { id: order_id },
      relations: ["orderList", "orderList.products"]

    });


  }
} 