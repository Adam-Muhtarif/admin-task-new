import { Module } from '@nestjs/common';
import { NotificationGateway } from './events.gateway';

@Module({
  providers: [NotificationGateway],
})
export class GatewayModule {}
