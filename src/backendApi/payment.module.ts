import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from './entities/orders.entity';
import { MulterModule } from '@nestjs/platform-express/multer';

@Module({
  imports:[
    TypeOrmModule.forFeature([Orders])],
  controllers: [PaymentController],
  providers: [PaymentService]
})
export class PaymentModule {}
