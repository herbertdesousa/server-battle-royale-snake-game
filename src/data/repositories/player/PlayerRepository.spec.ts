import { Player } from 'src/domain/model/Player';

import { PlayerRepositoryImpl } from './PlayerRepositoryImpl';

describe('PlayerRepository', () => {
  it('able to add and remove player', () => {
    const repository = new PlayerRepositoryImpl();

    expect(repository.all().length).toBe(0);

    const player = new Player(0, 0);

    repository.addPlayer('socket-123', player);

    expect(repository.all().length).toBe(1);

    repository.dropPlayerBySocketId('socket-123');

    expect(repository.all().length).toBe(0);
  });
});
