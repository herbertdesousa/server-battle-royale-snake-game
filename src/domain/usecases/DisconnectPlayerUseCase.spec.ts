import { PLAYER_MOVE_TICK_IN_MS } from 'src/config/DEFAULT_PLAYER_MOVE_TICK_IN_MS';
import { MockPlayerRepository } from 'src/data/repositories/player/MockPlayerRepository';
import { MockTickRepository } from 'src/data/repositories/tick/MockTickRepository';

import { DisconnectPlayerUseCase } from './DisconnectPlayerUseCase';

const playerRepo = new MockPlayerRepository();
const tickRepo = new MockTickRepository();

const usecase = new DisconnectPlayerUseCase(playerRepo, tickRepo);

describe('DisconnectPlayerUseCase', () => {
  it('should be able to disconnect player', async () => {
    const socketId = 'id-123';

    const playerRepoAddPlayerMock = jest
      .spyOn(playerRepo, 'dropPlayerBySocketId')
      .mockImplementationOnce(jest.fn());

    const tickRepoFindOrCreateMock = jest
      .spyOn(tickRepo, 'removeTickMemberInTickInterval')
      .mockImplementationOnce(jest.fn());

    usecase.execute({ socketId });

    expect(playerRepoAddPlayerMock).toHaveBeenCalledWith(socketId);

    expect(tickRepoFindOrCreateMock).toHaveBeenCalledWith(
      socketId,
      PLAYER_MOVE_TICK_IN_MS,
    );
  });
});
