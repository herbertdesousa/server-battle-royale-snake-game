import { Injectable } from '@nestjs/common';
import { Player } from 'src/domain/model/Player';

import { IPlayerRepository } from './IPlayerRespository';

type MapPlayerIdSocketId = Record<string, string>;

@Injectable()
export class PlayerRepositoryImpl implements IPlayerRepository {
  private players: Player[] = [];
  private playerSocket: MapPlayerIdSocketId = {};

  all() {
    return this.players;
  }

  addPlayer(socketId: string, payload: Player) {
    this.playerSocket[payload.id] = socketId;
    this.players.push(payload);
  }

  dropPlayerBySocketId(socketId: string) {
    this.players = this.players.filter(
      (player) => this.playerSocket[player.id] !== socketId,
    );
  }
}
