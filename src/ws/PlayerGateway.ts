import { ConnectedSocket, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { OnPlayerConnectUseCase } from 'src/domain/usecases/OnPlayerConnectUseCase';
import { OnPlayerDisconnectUseCase } from 'src/domain/usecases/OnPlayerDisconnectUseCase';

@WebSocketGateway({ transports: ['websocket'] })
export class PlayerGateway {
  constructor(
    private onPlayerConnectUseCase: OnPlayerConnectUseCase,

    private onPlayerDisconnectUseCase: OnPlayerDisconnectUseCase,
  ) {}

  async handleConnection(@ConnectedSocket() client: Socket) {
    await this.onPlayerConnectUseCase.execute({
      socketId: client.id,
      onPlayerMove: ({ headPosition, hasDropTail }) => {
        client.emit('PLAYER_MOVE', { headPosition, hasDropTail });
      },
    });
  }

  async handleDisconnect(@ConnectedSocket() client: Socket) {
    await this.onPlayerDisconnectUseCase.execute({
      socketId: client.id,
    });
  }
}
