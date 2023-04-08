import { LineController } from './backendApi/line.controller';
import { LineService } from './backendApi/line.service';

import { UsersModule } from './backendApi/users.module';
import { Order_list_approveModule } from './backendApi/order_list_approve.module'; import { ProductModule } from './backendApi/product.module';
import { Order_listModule } from './backendApi/order_list.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { InsertProductOrderModule } from './backendApi/insert_product_order.module';
import { AppService } from './app.service';
import { OrderModule } from './backendApi/order.module';
import { DataSource } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from './backendApi/entities/orders.entity'
import { Orders_details } from './backendApi/entities/orders_details.entity';
import { Product } from './backendApi/entities/product.entity';
import { PaymentModule } from './backendApi/payment.module';
import { Delivery } from './backendApi/entities/delivery.entity';
import { Categories } from './backendApi/entities/category.entity';
import { Sub_categories } from './backendApi/entities/sub_categories.entity';
import { Users } from './backendApi/entities/users.entity';
import { LineModule } from './backendApi/line.module';
@Module({
  imports: [
    LineModule,
    UsersModule, OrderModule, Order_listModule, ProductModule, InsertProductOrderModule, PaymentModule, Order_list_approveModule, TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.TYPEORM_HOST,
      port: Number(process.env.TYPEORM_PORT),
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      entities: [Product, Orders, Orders_details, Delivery, Categories, Sub_categories, Users],
      synchronize: true,
    }), ProductModule, OrderModule],
  controllers: [
    AppController],
  providers: [
    AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) { }
}
