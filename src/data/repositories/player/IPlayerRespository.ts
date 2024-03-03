import { Player } from 'src/domain/model/Player';

export interface IPlayerRepository {
  all(): Player[];

  findPlayerBySocketId(socketId: string): Player | null;

  addPlayer(socketId: string, payload: Player): void;

  dropPlayerBySocketId(socketId: string): void;
}
