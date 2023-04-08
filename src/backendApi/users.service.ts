/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common/pipes';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUsersDto } from './dto/create-users.dto';
import { Users } from './entities/users.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private UserRepository: Repository<Users>,
      ) {}
    
    async  create(createUsersDto:CreateUsersDto){
   //   console.log(createUsersDto.userId)
        const checkUser = await this.UserRepository.findOne({
          where:{userId:createUsersDto.userId}
        })
        if(!checkUser){
          return this.UserRepository.save(createUsersDto)
        }
        else{
        //  return console.error("มีข้อมูลนี้แล้ว");  
        }

      }
  
}
