import { delay } from 'src/utils/delay';

import { Tick } from './Tick';

describe('TickModel', () => {
  it('run as expect', async () => {
    const intervalInMs = 50;

    const tick = new Tick(intervalInMs, 'id-123');

    const onTick = jest.fn();

    const addedMember = tick.addMember({ id: 'member-123', onTick });

    await delay(120);

    expect(onTick).toHaveBeenCalledTimes(2);

    const members = tick.allMembers();
    expect(members.length).toBe(1);
    expect(members[0]).toEqual(addedMember);

    tick.dropMemberById(addedMember.id);
    expect(tick.allMembers().length).toBe(0);

    tick.destructor();
  });

  it('able to not call on tick after destruct', async () => {
    const intervalInMs = 50;

    const tick = new Tick(intervalInMs, 'id-123');

    const onTick = jest.fn();

    tick.addMember({ id: 'member-123', onTick });

    tick.destructor();

    await delay(60);

    expect(onTick).toHaveBeenCalledTimes(0);
  });
});
