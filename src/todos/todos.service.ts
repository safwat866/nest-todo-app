import { Injectable } from '@nestjs/common';
// import { Prisma } from 'generated/prisma/client';
import { Prisma } from '@prisma/client'; //  المسار الصحيح
import { PrismaService } from 'src/database/database.service';

@Injectable()
export class TodosService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, createTodoDto: Prisma.TodoCreateInput) {
    return await this.prisma.todo.create({
      data: {
        ...createTodoDto,
        user: {
          connect: { id: userId },
        },
      },
    });
  }

  async findAll(userId: string) {
    return await this.prisma.todo.findMany({
      where: {
        userId,
      },
    });
  }

  async update(id: string, updateTodoDto: Prisma.TodoUpdateInput) {
    return await this.prisma.todo.update({
      where: { id },
      data: updateTodoDto,
    });
  }

  async remove(id: string) {
    return await this.prisma.todo.delete({
      where: { id },
    });
  }

  async removeFinishedTasks(userId: string) {
    return await this.prisma.todo.deleteMany({
      where: { userId, done: true },
    });
  }
}
