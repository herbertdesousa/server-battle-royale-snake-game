import { Injectable } from '@nestjs/common';

import { IPlayerRepository } from './IPlayerRespository';

@Injectable()
export class MockPlayerRepository implements IPlayerRepository {
  all() {
    return [];
  }

  findPlayerBySocketId() {
    return null;
  }

  addPlayer() {
    //
  }

  dropPlayerBySocketId() {
    //
  }
}
