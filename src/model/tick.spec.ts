import { delay } from 'src/utils/delay';
import { Tick } from './tick.model';

describe('TickModel', () => {
  it('run as except', async () => {
    const intervalInMs = 1000;

    const tick = new Tick(intervalInMs, 'id-123');

    const onTick = jest.fn();

    const addedMember = tick.addMember({ id: 'member-123', onTick });

    await delay(2500);

    expect(onTick).toHaveBeenCalledTimes(2);

    const members = tick.allMembers();
    expect(members.length).toBe(1);
    expect(members[0]).toEqual(addedMember);

    tick.dropMemberById(addedMember.id);
    expect(tick.allMembers().length).toBe(0);

    tick.destructor();
  });
});
