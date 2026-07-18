import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/database/database.service';
import { RegisterUserDto } from './dto/RegisterUserDto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly databaseService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerUserDto: RegisterUserDto) {
    const { email, password } = registerUserDto;

    const existingUser = await this.databaseService.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) throw new BadRequestException('User already exists!');

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.databaseService.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    const { password: _, ...result } = user;

    return result;
  }

  async login(registerUserDto: RegisterUserDto) {
    // 1) check if the email exists
    // 2) compare the hashed password
    // 3) if not return invalid data
    // 4) return the user object with access token
    
    const { email, password } = registerUserDto;

    const user = await this.databaseService.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) throw new UnauthorizedException('Envalid Email Address!');

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) throw new UnauthorizedException('Envalid Credentials!');

    const payload = {
      sub: user.id,
      email: user.email,
    };

    const accessToken = await this.jwtService.sign(payload);

    return {
      accessToken: accessToken,
    };
  }
}
