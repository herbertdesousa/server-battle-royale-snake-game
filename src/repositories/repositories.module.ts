import { Global, Module } from '@nestjs/common';
import { PlayerRepository } from './player.repository';
import { TickRepository } from './tick.repository';

@Global()
@Module({
  providers: [PlayerRepository, TickRepository],
  exports: [PlayerRepository, TickRepository],
})
export class RepositoriesModule {}
