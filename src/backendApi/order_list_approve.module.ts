import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Orders_details } from './entities/orders_details.entity';
import { Product } from './entities/product.entity';
import { Orders } from './entities/orders.entity';
import { Order_list_apppoveController } from './order_list_apppove.controller';
import { Order_list_approveService } from './order_list_approve.service';
@Module({
    imports:  [TypeOrmModule.forFeature([Orders_details,Orders,Product])],
    controllers: [Order_list_apppoveController,],
    providers: [Order_list_approveService],
})
export class Order_list_approveModule {}
