import { MockPlayerRepository } from 'src/data/repositories/player/MockPlayerRepository';
import { MockTickRepository } from 'src/data/repositories/tick/MockTickRepository';

import { PLAYER_MOVE_TICK_IN_MS } from './OnPlayerConnectUseCase';
import { OnPlayerDisconnectUseCase } from './OnPlayerDisconnectUseCase';

const playerRepo = new MockPlayerRepository();
const tickRepo = new MockTickRepository();

const usecase = new OnPlayerDisconnectUseCase(playerRepo, tickRepo);

describe('OnPlayerDisconnectUseCase', () => {
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
