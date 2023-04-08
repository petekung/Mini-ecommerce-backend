import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders_details } from './entities/orders_details.entity';
import { Product } from './entities/product.entity';
import { Orders } from './entities/orders.entity';
import { Order_listController } from './order_list.controller';
import { Order_listService } from './order_list.service';

@Module({
    imports: [TypeOrmModule.forFeature([Orders,Orders_details,Product])],
    controllers: [Order_listController],
    providers: [Order_listService],
    exports:[Order_listService]
})
export class Order_listModule { } 