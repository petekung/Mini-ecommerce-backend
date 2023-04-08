/*
https://docs.nestjs.com/controllers#controllers
*/
import { Controller,Get, Post, Body, Patch, Param, Delete,Query } from '@nestjs/common';

import { Order_list_approveService } from './order_list_approve.service';

@Controller('order_approve')
export class Order_list_apppoveController {
    constructor(private readonly order_ApproveService:Order_list_approveService ) {} 
    @Get()
    findAll() {
      
      return this.order_ApproveService.findAll();
    }
}
