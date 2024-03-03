import { Player } from 'src/domain/model/Player';

export interface IPlayerRepository {
  all(): Player[];

  addPlayer(socketId: string, payload: Player): void;

  dropPlayerBySocketId(socketId: string): void;
}
