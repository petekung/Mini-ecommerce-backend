import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Orders } from './entities/orders.entity'
import { Repository } from 'typeorm';
import * as fs from 'fs';
@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Orders)
    private orderRepository: Repository<Orders>,
  ) { }
  create(createOrderDto: CreateOrderDto) {
    return this.orderRepository.save(createOrderDto);
  }

  findAll(): Promise<Orders[]> {
    return this.orderRepository.find();
  }

  findOne(order_id: number): Promise<Orders> {
    return this.orderRepository.findOneBy({
      id:order_id
    });
  }
  update(order_id: number, updateOrderDto: UpdateOrderDto) {
    return this.orderRepository.update(order_id,updateOrderDto)
   
  }

  async remove(id: number) {
    const order = await this.orderRepository.findOneBy({
      id: id,
    })
    // const filename = order.img_bill
    // await fs.unlink('./files/' + filename, (err) => {
    //   if (err) {
    //     console.error(err);
    //     return err;
    //   }
    // });   //Delete the file
    await this.orderRepository.delete(id);
  }
}

