import { Inject, Injectable } from '@nestjs/common';
import { IPlayerRepository } from 'src/data/repositories/player/IPlayerRespository';
import { ITickRepository } from 'src/data/repositories/tick/ITickRepository';

import { IResult, IUseCase } from './IUseCase';

type Req = { socketId: string };
type Res = IResult;

export const PLAYER_MOVE_TICK_IN_MS = 1000;

@Injectable()
export class OnPlayerDisconnectUseCase implements IUseCase<Req, Res> {
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
