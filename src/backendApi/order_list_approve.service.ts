import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Not, Repository,And,In } from 'typeorm';
import { Orders_details } from './entities/orders_details.entity';
import { Orders } from './entities/orders.entity';
import { Product } from './entities/product.entity';
import { ProductOrderStatus } from './entities/orders.entity';
@Injectable()
export class Order_list_approveService { 
    constructor(
        @InjectRepository(Orders_details)
        private order_listRepository: Repository<Orders_details>,
    
        @InjectRepository(Orders)
        private proDuctOrderRepository: Repository<Orders>,
    
        @InjectRepository(Product)
        private proDuctRepository: Repository<Product>,
      ) { }
      //
      findAll() {
        return this.proDuctOrderRepository.find({
            where:{ order_status:  In([ProductOrderStatus.COMPLETED])}, //แก้บรรทัดนี้
            relations:["orderList","orderList.products"],
            order: {
              id: { direction:"DESC"}
          }

        });
      }

    
}
