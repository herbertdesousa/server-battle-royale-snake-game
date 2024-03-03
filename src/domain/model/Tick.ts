interface TickMember {
  id: string;
  onTick(): void;
}

export class Tick {
  private members: TickMember[] = [];

  private interval: NodeJS.Timeout;

  constructor(
    public intervalInMs: number,
    public id: string,
  ) {
    this.interval = setInterval(() => {
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

  addMember(memberToAdd: TickMember): TickMember {
    this.members.push(memberToAdd);

    return memberToAdd;
  }

  dropMemberById(id: string) {
    this.members = this.members.filter((member) => member.id !== id);
  }
}
