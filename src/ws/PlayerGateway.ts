import { Inject } from '@nestjs/common';
import {
  ConnectedSocket,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { IPlayerRepository } from 'src/data/repositories/player/IPlayerRespository';
import { PlayerDirection } from 'src/domain/model/Player';
import { ConnectPlayerUseCase } from 'src/domain/usecases/ConnectPlayerUseCase';
import { DisconnectPlayerUseCase } from 'src/domain/usecases/DisconnectPlayerUseCase';

@WebSocketGateway({ transports: ['websocket'] })
export class PlayerGateway {
  constructor(
    @Inject('PLAYER_REPOSITORY')
    private playerRepository: IPlayerRepository,

    private connectPlayerUseCase: ConnectPlayerUseCase,

    private disconnectPlayerUseCase: DisconnectPlayerUseCase,
  ) {}

  async handleConnection(@ConnectedSocket() client: Socket) {
    await this.connectPlayerUseCase.execute({
      socketId: client.id,
      onPlayerMove: (player) => {
        client.emit('PLAYER:MOVE', {
          headPosition: player.head.position,
          direction: PlayerDirection[player.direction],
          hasDropTail: true,
        });
      },
    });
  }

  async handleDisconnect(@ConnectedSocket() client: Socket) {
    await this.disconnectPlayerUseCase.execute({
      socketId: client.id,
    });
  }

  @SubscribeMessage('PLAYER:UPWARDS-DIRECTION')
  async changeDirectionToUp(@ConnectedSocket() client: Socket) {
    const player = this.playerRepository.findPlayerBySocketId(client.id);

    if (player) player.direction = PlayerDirection.UP;
  }

  @SubscribeMessage('PLAYER:DOWNWARDS-DIRECTION')
  async changeDirectionToDown(@ConnectedSocket() client: Socket) {
    const player = this.playerRepository.findPlayerBySocketId(client.id);

    if (player) player.direction = PlayerDirection.DOWN;
  }

  @SubscribeMessage('PLAYER:LEFTWARDS-DIRECTION')
  async changeDirectionToLeft(@ConnectedSocket() client: Socket) {
    const player = this.playerRepository.findPlayerBySocketId(client.id);

    if (player) player.direction = PlayerDirection.LEFT;
  }

  @SubscribeMessage('PLAYER:RIGHTWARDS-DIRECTION')
  async changeDirectionToRight(@ConnectedSocket() client: Socket) {
    const player = this.playerRepository.findPlayerBySocketId(client.id);

    if (player) player.direction = PlayerDirection.RIGHT;
  }
}
