import { Injectable } from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async create(createPostInput: CreatePostInput) {
    return await this.prisma.post.create({
      data: { ...createPostInput },
      include: { category: true },
    });
  }

  async findAll() {
    return await this.prisma.post.findMany({
      include: { category: true },
    });
  }

  async findByCategory(id: number) {
    return await this.prisma.post.findMany({
      where: { categoryId: id },
    });
  }

  async findOne(id: number) {
    return await this.prisma.post.findFirst({
      where: { id: id },
      include: { category: true },
    });
  }

  async update(id: number, updatePostInput: UpdatePostInput) {
    return await this.prisma.post.update({
      where: { id: id },
      data: { ...updatePostInput },
      include: { category: true },
    });
  }

  async remove(id: number) {
    return await this.prisma.post.delete({
      where: { id: id },
      include: { category: true },
    });
  }
}
