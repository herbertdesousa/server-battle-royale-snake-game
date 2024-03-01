import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { PlayerRepository } from 'src/repositories/player.repository';
import { TickRepository } from 'src/repositories/tick.repository';
/*
interface TickMember {
  id: string;
  onTick(): void;
}

class Tick {
  private members: TickMember[] = [];

  private interval: NodeJS.Timeout;

  constructor(
    public intervalInMs: number,
    public id: string,
  ) {
    this.interval = setInterval(() => {
      console.log('interval');
      this.members.forEach((member) => member.onTick());
    }, intervalInMs);

    this.interval.unref();
  }

  destructor() {
    clearInterval(this.interval);
  }

  allMembers(): TickMember[] {
    return this.members;
  }

  addMember(memberToAdd: TickMember) {
    this.members.push(memberToAdd);
  }

  dropMember(id: string) {
    this.members = this.members.filter((member) => member.id !== id);
  }
}

class TickRepository {
  private ticks: Tick[] = [];

  all(): Tick[] {
    return this.ticks;
  }

  findOrCreateWithInverval(intervalInMs: number): Tick {
    const findedTick = this.ticks.find(
      (tick) => tick.intervalInMs === intervalInMs,
    );

    if (findedTick) return findedTick;

    const createdTick = new Tick(intervalInMs, randomUUID());

    this.ticks.push(createdTick);

    return createdTick;
  }

  removeMemberIdInInterval(memberId: string, intervalInMs: number) {
    const tick = this.ticks.find((tick) => tick.intervalInMs === intervalInMs);

    if (!tick) return;

    tick.dropMember(memberId);

    const isTickEmpty = tick.allMembers().length === 0;

    if (isTickEmpty) {
      // tick.destructor();
      this.ticks = this.ticks.filter((_tick) => _tick.id !== tick.id);
    }
  }
}

class Player {
  constructor(
    public socketId: string,
    public moveTickId: string,
  ) {
    //
  }
}

class PlayerRepository {
  private players: Player[] = [];

  addPlayer(payload: Player) {
    this.players.push(payload);
  }

  dropPlayerBySocketId(socketId: string) {
    this.players = this.players.filter(
      (player) => player.socketId !== socketId,
    );
  }
}
 */
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

    const tick = this.tickRepository.findOrCreateWithInverval(
      PLAYER_MOVE_TICK_IN_MS,
    );

    tick.addMember({
      id: client.id,
      onTick: () => {
        client.emit('CELLS_MOVE', { socketId });
      },
    });

    this.playerRepository.addPlayer({ socketId, moveTickId: tick.id });
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    const socketId = String(client.id);

    this.playerRepository.dropPlayerBySocketId(socketId);

    this.tickRepository.removeMemberIdInInterval(
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
