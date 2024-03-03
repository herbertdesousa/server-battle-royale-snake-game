import { Global, Module } from '@nestjs/common';

import { OnPlayerConnectUseCase } from './OnPlayerConnectUseCase';
import { OnPlayerDisconnectUseCase } from './OnPlayerDisconnectUseCase';

@Global()
@Module({
  providers: [OnPlayerConnectUseCase, OnPlayerDisconnectUseCase],
  exports: [OnPlayerConnectUseCase, OnPlayerDisconnectUseCase],
})
export class UseCasesModule {}
