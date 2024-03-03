import { Inject } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { IPlayerRepository } from 'src/data/repositories/player/IPlayerRespository';
import { ITickRepository } from 'src/data/repositories/tick/ITickRepository';
import { OnPlayerConnectUseCase } from 'src/domain/usecases/OnPlayerConnectUseCase';

const PLAYER_MOVE_TICK_IN_MS = 1000;

@WebSocketGateway({ transports: ['websocket'] })
export class PlayerGateway {
  constructor(
    private onPlayerConnectUseCase: OnPlayerConnectUseCase,

    @Inject('PLAYER_REPOSITORY')
    private playerRepository: IPlayerRepository,

    @Inject('TICK_REPOSITORY')
    private tickRepository: ITickRepository,
  ) {}

  async handleConnection(@ConnectedSocket() client: Socket) {
    await this.onPlayerConnectUseCase.execute({
      socketId: client.id,
      onPlayerMove: ({ headPosition, hasDropTail }) => {
        client.emit('PLAYER_MOVE', { headPosition, hasDropTail });
      },
    });
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    const socketId = String(client.id);

    this.playerRepository.dropPlayerBySocketId(socketId);

    this.tickRepository.removeTickMemberInTickInterval(
      socketId,
      PLAYER_MOVE_TICK_IN_MS,
    );

    console.log(`disconnection: ${client.id}`);
  }

  @SubscribeMessage('HELLO_WORLD')
  handleEvent(@MessageBody() data: string): string {
    console.log(this.tickRepository.all());

    return data;
  }
}
