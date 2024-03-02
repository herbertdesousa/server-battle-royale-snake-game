import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Player } from 'src/model/player.model';
import { PlayerRepository } from 'src/repositories/player.repository';
import { TickRepository } from 'src/repositories/tick.repository';

const PLAYER_MOVE_TICK_IN_MS = 1000;

@WebSocketGateway({ transports: ['websocket'] })
export class HelloWorldGateway {
  constructor(
    private playerRepository: PlayerRepository,
    private tickRepository: TickRepository,
  ) {}

  handleConnection(@ConnectedSocket() client: Socket) {
    console.log(`connection: ${client.id}`);

    const socketId = String(client.id);

    const tick = this.tickRepository.findOrCreate(PLAYER_MOVE_TICK_IN_MS);

    this.playerRepository.addPlayer(client.id, new Player(0, 0));

    tick.addMember({
      id: client.id,
      onTick: () => {
        client.emit('CELLS_MOVE', { socketId });
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
