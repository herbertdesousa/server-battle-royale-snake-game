import { MockPlayerRepository } from 'src/data/repositories/player/MockPlayerRepository';
import { MockTickRepository } from 'src/data/repositories/tick/MockTickRepository';
import { delay } from 'src/utils/delay';

import {
  ConnectPlayerUseCase,
  PLAYER_MOVE_TICK_IN_MS,
} from './ConnectPlayerUseCase';

const playerRepo = new MockPlayerRepository();
const tickRepo = new MockTickRepository();

const usecase = new ConnectPlayerUseCase(playerRepo, tickRepo);

describe('ConnectPlayerUseCase', () => {
  it('should be able to connect player', async () => {
    const socketId = 'id-123';

    const tickRepoFindOrCreateMock = jest
      .spyOn(tickRepo, 'findOrCreate')
      .mockReturnValueOnce({
        addMember: ({ onTick }) => {
          setTimeout(() => {
            onTick();
          }, 100);
        },
      } as any);

    const playerRepoAddPlayerMock = jest
      .spyOn(playerRepo, 'addPlayer')
      .mockImplementationOnce(jest.fn());

    const onPlayerMove = jest.fn();

    usecase.execute({ socketId, onPlayerMove });

    expect(tickRepoFindOrCreateMock).toHaveBeenCalledWith(
      PLAYER_MOVE_TICK_IN_MS,
    );
    expect(tickRepoFindOrCreateMock).toHaveBeenCalledTimes(1);

    expect(playerRepoAddPlayerMock).toHaveBeenCalledWith(
      socketId,
      expect.objectContaining({
        head: expect.objectContaining({ position: { x: 0, y: 0 } }),
      }),
    );

    await delay(100);

    expect(onPlayerMove).toHaveBeenCalledTimes(1);
    expect(onPlayerMove).toHaveBeenCalledWith({
      headPosition: { x: 0, y: 1 },
      hasDropTail: true,
    });
  });
});
