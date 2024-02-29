import { Module } from '@nestjs/common';
import { HelloWorldGateway } from './ws/hello-world.gateway';

@Module({
  imports: [HelloWorldGateway],
  controllers: [],
  providers: [],
})
export class AppModule {}
