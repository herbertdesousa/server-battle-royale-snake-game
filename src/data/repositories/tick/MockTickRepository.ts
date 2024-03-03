import { Injectable } from '@nestjs/common';
import { Tick } from 'src/domain/model/Tick';

import { ITickRepository } from './ITickRepository';

@Injectable()
export class MockTickRepository implements ITickRepository {
  all(): Tick[] {
    return [];
  }

  findOrCreate(): Tick {
    return {} as Tick;
  }

  removeTickMemberInTickInterval() {
    //
  }
}
