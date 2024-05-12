// socket.gateway.ts

import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { PostType } from 'src/post/entities/post.entity';

@WebSocketGateway({ cors: { origin: '*' } })
export class NotificationGateway {
  @WebSocketServer()
  server: Server;

  notifyPostCreated(post: PostType) {
    this.server.emit('postCreated', post);
  }
}
