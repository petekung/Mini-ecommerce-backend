/*
https://docs.nestjs.com/controllers#controllers
*/
import { Controller,Get, Post, Body, Patch, Param, Delete,Query } from '@nestjs/common';
import { Order_listService } from './order_list.service';

@Controller('order_list')
export class Order_listController {
    constructor(private readonly order_listService:Order_listService ) {}
  
    @Get()
    findAll(@Query('payment_status')PlaymentStatus ?: string) {
      
      return this.order_listService.findAll();
    }
    
  @Get(':order_id')
  findOne(@Param('order_id') order_id: number) {
    return this.order_listService.findOne(order_id);
  } 


 
}

