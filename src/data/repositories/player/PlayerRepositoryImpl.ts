import { Injectable } from '@nestjs/common';
import { Player } from 'src/domain/model/Player';

import { IPlayerRepository } from './IPlayerRespository';

type MapSocketIdPlayer = Record<string, Player>;

@Injectable()
export class PlayerRepositoryImpl implements IPlayerRepository {
  private players: MapSocketIdPlayer = {};

  all() {
    return Object.values(this.players).map((player) => player);
  }

  findPlayerBySocketId(socketId: string): Player {
    return this.players[socketId];
  }

  addPlayer(socketId: string, player: Player) {
    this.players[socketId] = player;
  }

  dropPlayerBySocketId(socketId: string) {
    delete this.players[socketId];
  }
}
