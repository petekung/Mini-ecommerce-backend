import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateUsersDto } from './dto/create-users.dto';
import { UsersService } from './users.service';


@Controller('/users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }
  
    @Post('/create')
    create(@Body() createUsersDto: CreateUsersDto) {
      return this.usersService.create(createUsersDto);
    }

}
