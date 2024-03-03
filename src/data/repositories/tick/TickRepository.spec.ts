import { TickRepositoryImpl } from './TickRepositoryImpl';

describe('TickRepository', () => {
  it('able to find or create a tick providing interval', () => {
    const repository = new TickRepositoryImpl();

    expect(repository.all().length).toBe(0);

    const tick = repository.findOrCreate(1000);

    expect(tick.intervalInMs).toBe(1000);
    expect(repository.all().length).toBe(1);

    repository.findOrCreate(1000);

    expect(repository.all().length).toBe(1);

    repository.findOrCreate(2000);

    expect(repository.all().length).toBe(2);
  });

  it('able to remove member with id in tick with interval', () => {
    const repository = new TickRepositoryImpl();

    const tick = repository.findOrCreate(1000);

    expect(repository.all().length).toBe(1);

    const tickDestructor = jest.spyOn(tick, 'destructor');

    repository.removeTickMemberInTickInterval(tick.id, tick.intervalInMs);

    expect(repository.all().length).toBe(0);
    expect(tickDestructor).toHaveBeenCalledTimes(1);
  });

  it('able to ignore when remove tick with interval not existing', () => {
    const repository = new TickRepositoryImpl();

    expect(repository.all().length).toBe(0);

    repository.removeTickMemberInTickInterval('non-exists', 1000);

    expect(repository.all().length).toBe(0);
  });
});
