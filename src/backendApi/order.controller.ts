import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';


@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto); 
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':order_id')
  findOne(@Param('order_id') order_id: number) {
    return this.orderService.findOne(+order_id);
  } 

  

  @Patch(':order_id')
  update(@Param('order_id') id: number, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(id, updateOrderDto);
  }

  @Delete(':order_id')
  remove(@Param('order_id') order_id: number) {
    return this.orderService.remove(order_id);
  }
  
}

