import { Inject, Injectable } from '@nestjs/common';
import { PLAYER_MOVE_TICK_IN_MS } from 'src/config/DEFAULT_PLAYER_MOVE_TICK_IN_MS';
import { IPlayerRepository } from 'src/data/repositories/player/IPlayerRespository';
import { ITickRepository } from 'src/data/repositories/tick/ITickRepository';
import { Player } from 'src/domain/model/Player';

import { IResult, IUseCase } from './IUseCase';

type Req = {
  socketId: string;
  onPlayerMove: (player: Player) => void;
};
type Res = IResult;

@Injectable()
export class ConnectPlayerUseCase implements IUseCase<Req, Res> {
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

        onPlayerMove(player);
      },
    });

    return { type: 'SUCCESS', payload: {} };
  }
}
