import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile ,Res, Global  } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { encode, escape } from 'querystring';
import { Hash } from 'crypto';
import { Orders } from './entities/orders.entity';

const express = require("express");

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) { }

  @Post('/file')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './files',
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        const filename = `${uniqueSuffix}${ext}`;
        callback(null, filename);
      }
    })
  }))
  handleUpload(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    return file.filename
  }
  @Patch(':id')
  update(@Param('id') id: number, @Body() updatePaymentDto: UpdatePaymentDto,) {
    return this.paymentService.update(id, updatePaymentDto);
  }

  @Get(':picturePath')
  getPicture(@Param('picturePath')filename,@Res() res){
   return res.sendFile(filename,{root:'./files'})
  }

  @Get('/bill/:uuid')
  findOne(@Param('uuid') uuid: string) {
    return this.paymentService.findOne(uuid);
  } 


}
