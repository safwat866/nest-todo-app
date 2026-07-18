import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma } from 'generated/prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Post()
  create(@Body() createUserDto: Prisma.UserCreateInput) {
    return this.usersService.create(createUserDto);
  }

  @Get(':id')
  findUserById(@Body('id') id: string) {
    return this.usersService.findById(id);
  }

  @Get('/email/:email')
  findUserByEmail(@Body('email') email: string) {
    return this.usersService.findByEmail(email);
  }
}
