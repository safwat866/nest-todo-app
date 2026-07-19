import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
// import { Prisma } from 'generated/prisma/client';
import { Prisma } from '@prisma/client'; //  المسار الصحيح

@UseGuards(JwtAuthGuard)
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  create(@Body() createTodoDto: Prisma.TodoCreateInput, @Req() req) {
    return this.todosService.create(req.user.id, createTodoDto);
  }

  @Get()
  findAll(@Req() req) {
    return this.todosService.findAll(req.user.id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTodoDto: Prisma.TodoUpdateInput,
  ) {
    return this.todosService.update(id, updateTodoDto);
  }

  @Delete('/delete-done')
  removeDone(@Req() req) {
    return this.todosService.removeFinishedTasks(req.user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todosService.remove(id);
  }
}
