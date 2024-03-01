import { Module } from '@nestjs/common';
import { RepositoriesModule } from './repositories/repositories.module';
import { HelloWorldGateway } from './ws/hello-world.gateway';

@Module({
  imports: [RepositoriesModule, HelloWorldGateway],
  controllers: [],
  providers: [],
})
export class AppModule {}
