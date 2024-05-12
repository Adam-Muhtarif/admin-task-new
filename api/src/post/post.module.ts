import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { PostService } from './post.service';
import { PostResolver } from './post.resolver';
import { PostProcessor } from './notifications.process';
import { PrismaService } from 'src/prisma.service';
import { GatewayModule } from 'src/events/events.module';
import { NotificationGateway } from 'src/events/events.gateway';

@Module({
  providers: [
    PostResolver,
    PostService,
    PrismaService,
    PostProcessor,
    NotificationGateway,
  ],
  imports: [
    BullModule.registerQueue({
      name: 'notifications',
    }),
    GatewayModule,
  ],
})
export class PostModule {}
