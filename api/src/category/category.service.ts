import { Injectable } from '@nestjs/common';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async create(createCategoryInput: CreateCategoryInput) {
    return await this.prisma.category.create({
      data: { ...createCategoryInput },
    });
  }

  async findAll() {
    return await this.prisma.category.findMany({
      include: { posts: true },
    });
  }

  async findOne(id: number) {
    return await this.prisma.category.findFirst({
      where: { id: id },
      include: { posts: true },
    });
  }

  async update(id: number, updateCategoryInput: UpdateCategoryInput) {
    return await this.prisma.category.update({
      where: { id: id },
      data: { ...updateCategoryInput },
    });
  }

  async remove(id: number) {
    return await this.prisma.category.delete({
      where: { id: id },
    });
  }
}
