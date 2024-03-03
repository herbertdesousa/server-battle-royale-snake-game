import { Global, Module } from '@nestjs/common';

import { ConnectPlayerUseCase } from './ConnectPlayerUseCase';
import { DisconnectPlayerUseCase } from './DisconnectPlayerUseCase';

@Global()
@Module({
  providers: [ConnectPlayerUseCase, DisconnectPlayerUseCase],
  exports: [ConnectPlayerUseCase, DisconnectPlayerUseCase],
})
export class UseCasesModule {}
