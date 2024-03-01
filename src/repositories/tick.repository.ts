import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Tick } from 'src/model/tick.model';

@Injectable()
export class TickRepository {
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

    tick.dropMemberById(memberId);

    const isTickEmpty = tick.allMembers().length === 0;

    if (isTickEmpty) {
      tick.destructor();
      this.ticks = this.ticks.filter((_tick) => _tick.id !== tick.id);
    }
  }
}
