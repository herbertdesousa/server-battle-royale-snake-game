import { Injectable } from '@nestjs/common';
import { Player } from 'src/model/player.model';

@Injectable()
export class PlayerRepository {
  private players: Player[] = [];

  all(): Player[] {
    return this.players;
  }

  addPlayer(payload: Player) {
    this.players.push(payload);
  }

  dropPlayerBySocketId(socketId: string) {
    this.players = this.players.filter(
      (player) => player.socketId !== socketId,
    );
  }
}
