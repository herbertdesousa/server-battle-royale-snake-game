import { Inject, Injectable } from '@nestjs/common';
import { IPlayerRepository } from 'src/data/repositories/player/IPlayerRespository';
import { ITickRepository } from 'src/data/repositories/tick/ITickRepository';
import { Player } from 'src/domain/model/Player';

import { TransformPosition } from '../model/TransformPosition';
import { IResult, IUseCase } from './IUseCase';

type Req = {
  socketId: string;
  onPlayerMove: (payload: {
    headPosition: TransformPosition;
    hasDropTail: boolean;
  }) => void;
};
type Res = IResult;

export const PLAYER_MOVE_TICK_IN_MS = 1000;

@Injectable()
export class OnPlayerConnectUseCase implements IUseCase<Req, Res> {
  constructor(
    @Inject('PLAYER_REPOSITORY')
    private playerRepository: IPlayerRepository,

    @Inject('TICK_REPOSITORY')
    private tickRepository: ITickRepository,
  ) {}

  async execute({ socketId, onPlayerMove }: Req): Promise<Res> {
    const tick = this.tickRepository.findOrCreate(PLAYER_MOVE_TICK_IN_MS);

    const player = new Player(0, 0);

    this.playerRepository.addPlayer(socketId, player);

    tick.addMember({
      id: socketId,
      onTick: () => {
        player.move();

        onPlayerMove({
          headPosition: player.head.position,
          hasDropTail: true,
        });
      },
    });

    return { type: 'SUCCESS', payload: {} };
  }
}
