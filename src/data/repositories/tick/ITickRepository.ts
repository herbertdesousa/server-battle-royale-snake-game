import { Tick } from 'src/domain/model/Tick';

export interface ITickRepository {
  all(): Tick[];

  findOrCreate(intervalInMs: number): Tick;

  removeTickMemberInTickInterval(memberId: string, intervalInMs: number): void;
}
