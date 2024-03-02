import { Player } from 'src/model/player.model';
import { PlayerRepository } from './player.repository';

describe('PlayerRepository', () => {
  it('able to add and remove player', () => {
    const repository = new PlayerRepository();

    expect(repository.all().length).toBe(0);

    const player = new Player(0, 0);

    repository.addPlayer('socket-123', player);

    expect(repository.all().length).toBe(1);

    repository.dropPlayerBySocketId('socket-123');

    expect(repository.all().length).toBe(0);
  });
});
