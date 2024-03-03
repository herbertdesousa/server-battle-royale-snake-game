import { Inject, Injectable } from '@nestjs/common';
import { PLAYER_MOVE_TICK_IN_MS } from 'src/config/DEFAULT_PLAYER_MOVE_TICK_IN_MS';
import { IPlayerRepository } from 'src/data/repositories/player/IPlayerRespository';
import { ITickRepository } from 'src/data/repositories/tick/ITickRepository';

import { IResult, IUseCase } from './IUseCase';

type Req = { socketId: string };
type Res = IResult;

@Injectable()
export class DisconnectPlayerUseCase implements IUseCase<Req, Res> {
  constructor(
    @Inject('PLAYER_REPOSITORY')
    private playerRepository: IPlayerRepository,

    @Inject('TICK_REPOSITORY')
    private tickRepository: ITickRepository,
  ) {}

  async execute({ socketId }: Req): Promise<Res> {
    this.playerRepository.dropPlayerBySocketId(socketId);

    this.tickRepository.removeTickMemberInTickInterval(
      socketId,
      PLAYER_MOVE_TICK_IN_MS,
    );

    return { type: 'SUCCESS', payload: {} };
  }
}
