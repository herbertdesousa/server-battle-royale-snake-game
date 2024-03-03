import { Global, Module } from '@nestjs/common';
import { PlayerRepositoryImpl } from './player/PlayerRepositoryImpl';
import { TickRepositoryImpl } from './tick/TickRepositoryImpl';

@Global()
@Module({
  providers: [
    {
      provide: 'PLAYER_REPOSITORY',
      useClass: PlayerRepositoryImpl,
    },
    {
      provide: 'TICK_REPOSITORY',
      useClass: TickRepositoryImpl,
    },
  ],
  exports: [
    {
      provide: 'PLAYER_REPOSITORY',
      useClass: PlayerRepositoryImpl,
    },
    {
      provide: 'TICK_REPOSITORY',
      useClass: TickRepositoryImpl,
    },
  ],
})
export class RepositoriesModule {}
