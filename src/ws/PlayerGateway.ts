import { ConnectedSocket, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { ConnectPlayerUseCase } from 'src/domain/usecases/ConnectPlayerUseCase';
import { DisconnectPlayerUseCase } from 'src/domain/usecases/DisconnectPlayerUseCase';

@WebSocketGateway({ transports: ['websocket'] })
export class PlayerGateway {
  constructor(
    private connectPlayerUseCase: ConnectPlayerUseCase,

    private disconnectPlayerUseCase: DisconnectPlayerUseCase,
  ) {}

  async handleConnection(@ConnectedSocket() client: Socket) {
    await this.connectPlayerUseCase.execute({
      socketId: client.id,
      onPlayerMove: ({ headPosition, hasDropTail }) => {
        client.emit('PLAYER_MOVE', { headPosition, hasDropTail });
      },
    });
  }

  async handleDisconnect(@ConnectedSocket() client: Socket) {
    await this.disconnectPlayerUseCase.execute({
      socketId: client.id,
    });
  }
}
