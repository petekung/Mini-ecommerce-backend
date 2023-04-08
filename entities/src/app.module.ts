import { LineModule } from './../../src/backendApi/line.module';
import { Order_listModule } from './../../src/backendApi/order_list.module';
import { Order_listController } from './../../src/backendApi/order_list.controller';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    LineModule,
    Order_listModule,],
  controllers: [
    Order_listController, AppController],
  providers: [AppService],
})
export class AppModule { }
