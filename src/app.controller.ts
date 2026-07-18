import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  getHello(): string {
    return "hello world";
  }
}
