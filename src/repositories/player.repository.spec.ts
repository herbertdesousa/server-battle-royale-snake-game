import { PlayerRepository } from './player.repository';

describe('PlayerRepository', () => {
  it('able to add and remove player', () => {
    const repository = new PlayerRepository();

    expect(repository.all().length).toBe(0);

    repository.addPlayer({
      socketId: 'socket-123',
      moveTickId: 'tick-123',
    });

    expect(repository.all().length).toBe(1);

    repository.dropPlayerBySocketId('socket-123');

    expect(repository.all().length).toBe(0);
  });
});
