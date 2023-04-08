import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InsertProductOrderService } from './insert_product_order.service';
import { CreateInsertProductOrderDto } from './dto/create-insert_product_order.dto';
import { UpdateInsertProductOrderDto } from './dto/update-insert_product_order.dto';
import { callbackify } from 'util';

@Controller('insertProductOrder')
export class InsertProductOrderController {
  constructor(private readonly insertProductOrderService: InsertProductOrderService) { }
  
  @Post()
  create(@Body() createInsertProductOrderDto: CreateInsertProductOrderDto) {
    return this.insertProductOrderService.create(createInsertProductOrderDto);
  }
  // @Post()
  // addProductOrder(@Body() createInsertProductOrderDto: CreateInsertProductOrderDto) {
  //   return this.insertProductOrderService.create(createInsertProductOrderDto);
  // }

  @Get(':order_id')
  findOne(@Param('order_id') order_id: number) {
    return this.insertProductOrderService.findOne(order_id);
  } 
  @Get("/delivery/insert")
  findDelivery() {
    return this.insertProductOrderService.findDelivery();
  }

  @Get()
  findAll() {
    return this.insertProductOrderService.findAll();
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.insertProductOrderService.remove(id);
  }
}
