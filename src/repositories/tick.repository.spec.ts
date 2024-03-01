import { TickRepository } from './tick.repository';

describe('TickRepository', () => {
  it('able to find or create a tick providing interval', () => {
    const repository = new TickRepository();

    expect(repository.all().length).toBe(0);

    const tick = repository.findOrCreateWithInverval(1000);

    expect(tick.intervalInMs).toBe(1000);
    expect(repository.all().length).toBe(1);

    repository.findOrCreateWithInverval(1000);

    expect(repository.all().length).toBe(1);

    repository.findOrCreateWithInverval(2000);

    expect(repository.all().length).toBe(2);
  });

  it('able to remove member with id in tick with interval', () => {
    const repository = new TickRepository();

    const tick = repository.findOrCreateWithInverval(1000);

    expect(repository.all().length).toBe(1);

    const tickDestructor = jest.spyOn(tick, 'destructor');

    repository.removeMemberIdInInterval(tick.id, tick.intervalInMs);

    expect(repository.all().length).toBe(0);
    expect(tickDestructor).toHaveBeenCalledTimes(1);
  });

  it('able to ignore when remove tick with interval not existing', () => {
    const repository = new TickRepository();

    expect(repository.all().length).toBe(0);

    repository.removeMemberIdInInterval('non-exists', 1000);

    expect(repository.all().length).toBe(0);
  });
});
