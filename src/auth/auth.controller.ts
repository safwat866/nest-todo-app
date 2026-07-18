import {  Body, Controller, Get, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { RegisterUserDto } from './dto/RegisterUserDto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  registerUser(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }

  @Post('/login')
  login(@Body() registerUser: RegisterUserDto) {
    return this.authService.login(registerUser);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getUserInfo(@Req() req) {
    return req.user;
  }
}
