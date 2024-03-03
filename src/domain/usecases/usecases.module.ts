import { Global, Module } from '@nestjs/common';

import { OnPlayerConnectUseCase } from './OnPlayerConnectUseCase';

@Global()
@Module({
  providers: [OnPlayerConnectUseCase],
  exports: [OnPlayerConnectUseCase],
})
export class UseCasesModule {}
