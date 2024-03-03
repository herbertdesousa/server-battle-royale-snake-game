import { Player } from 'src/domain/model/Player';

import { PlayerRepositoryImpl } from './PlayerRepositoryImpl';

describe('PlayerRepository', () => {
  it('able to add and remove player', () => {
    const repository = new PlayerRepositoryImpl();

    expect(repository.all().length).toBe(0);

    const player = new Player(0, 0);

    const socketId = 'socket-123';
    repository.addPlayer(socketId, player);

    expect(repository.findPlayerBySocketId(socketId)).toBeTruthy();
    expect(repository.all().length).toBe(1);

    repository.dropPlayerBySocketId(socketId);

    expect(repository.findPlayerBySocketId(socketId)).not.toBeTruthy();
    expect(repository.all().length).toBe(0);
  });
});
