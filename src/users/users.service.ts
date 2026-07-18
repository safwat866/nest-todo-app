import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma/client';
import { PrismaService } from 'src/database/database.service';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: PrismaService) {}

  async create(createUserDto: Prisma.UserCreateInput) {
    return this.databaseService.user.create({
      data: createUserDto,
    });
  }

  async findAll() {
    return this.databaseService.user.findMany();
  }

  async findByEmail(email: string) {
    return this.databaseService.user.findUnique({
      where: {
        email,
      },
    });
  }

  async findById(id: string) {
    return this.databaseService.user.findUnique({
      where: {
        id,
      },
    });
  }
}
