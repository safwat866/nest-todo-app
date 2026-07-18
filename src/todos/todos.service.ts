import { Injectable } from '@nestjs/common';
// import { Prisma } from 'generated/prisma/client';
import { Prisma } from '@prisma/client'; //  المسار الصحيح
import { PrismaService } from 'src/database/database.service';

@Injectable()
export class TodosService {
  constructor(private readonly prisma: PrismaService) {}

  create(createTodoDto: Prisma.TodoCreateInput) {
    return this.prisma.todo.create({
      data: createTodoDto,
    });
  }

  findAll(userId: string) {
    return this.prisma.todo.findMany({
      where: {
        userId
      }
    })
  }

  findOne(id: string) {
    return `This action returns a #${id} todo`;
  }

  update(id: string, updateTodoDto: Prisma.TodoUpdateInput) {
    return `This action updates a #${id} todo`;
  }

  remove(id: string) {
    return `This action removes a #${id} todo`;
  }
}
