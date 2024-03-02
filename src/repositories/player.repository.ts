import { Injectable } from '@nestjs/common';
import { Player } from 'src/model/player.model';

type MapPlayerIdSocketId = Record<string, string>;

@Injectable()
export class PlayerRepository {
  private players: Player[] = [];
  private playerSocket: MapPlayerIdSocketId = {};

  all(): Player[] {
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
