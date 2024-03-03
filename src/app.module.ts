import { Module } from '@nestjs/common';

import { RepositoriesModule } from './data/repositories/repositories.module';
import { UseCasesModule } from './domain/usecases/usecases.module';
import { PlayerGateway } from './ws/PlayerGateway';

@Module({
  imports: [RepositoriesModule, UseCasesModule, PlayerGateway],
  controllers: [],
  providers: [],
})
export class AppModule {}
