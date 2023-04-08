import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InsertProductOrderService } from './insert_product_order.service';
import { InsertProductOrderController } from './insert_product_order.controller';
import { Sub_categories } from './entities/sub_categories.entity';
import { Orders } from './entities/orders.entity';
import { Product } from './entities/product.entity';
import { Orders_details } from './entities/orders_details.entity';
import { Delivery } from './entities/delivery.entity';
import { Categories } from './entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Categories, Delivery, Orders_details, Product, Orders, Sub_categories])],
  controllers: [InsertProductOrderController],
  providers: [InsertProductOrderService]
})
export class InsertProductOrderModule {}