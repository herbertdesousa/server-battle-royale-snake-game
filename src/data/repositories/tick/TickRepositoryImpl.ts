import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Tick } from 'src/domain/model/Tick';
import { ITickRepository } from './ITickRepository';

@Injectable()
export class TickRepositoryImpl implements ITickRepository {
  private ticks: Tick[] = [];

  all(): Tick[] {
    return this.ticks;
  }

  findOrCreate(intervalInMs: number): Tick {
    const findedTick = this.ticks.find(
      (tick) => tick.intervalInMs === intervalInMs,
    );

    if (findedTick) return findedTick;

    const createdTick = new Tick(intervalInMs, randomUUID());

    this.ticks.push(createdTick);

    return createdTick;
  }

  removeTickMemberInTickInterval(memberId: string, intervalInMs: number) {
    const tick = this.ticks.find((tick) => tick.intervalInMs === intervalInMs);

    if (!tick) return;

    tick.dropMemberById(memberId);

    const hasNoLongerMembers = tick.allMembers().length === 0;

    if (hasNoLongerMembers) {
      tick.destructor();
      this.ticks = this.ticks.filter((_tick) => _tick.id !== tick.id);
    }
  }
}
