import { Injectable, Post } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Orders } from './entities/orders.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Orders)
    private paymentRepository: Repository<Orders>,
  ) { }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return this.paymentRepository.update(id, updatePaymentDto);
  }

  findOne(uuid: string): Promise<Orders> {
  //  console.log(uuid)
    return this.paymentRepository.findOne({
      where: { uuid: uuid },
      relations: ["orderList", "orderList.products"]
    });

  }
  // create(createPaymentDto:CreatePaymentDto) :Promise<product_order>{
  //     this.paymentRepository.save(order)
  // }

}
