// post.processor.ts

import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { PostType } from './entities/post.entity';
import { NotificationGateway } from 'src/events/events.gateway';

@Processor('notifications')
export class PostProcessor {
  constructor(private readonly notificationGateWay: NotificationGateway) {}

  @Process('postCreate')
  async create(job: Job<PostType>) {
    try {
      this.notificationGateWay.notifyPostCreated(job.data);
    } catch (e) {
      console.error(e.message);
    }
  }
}
