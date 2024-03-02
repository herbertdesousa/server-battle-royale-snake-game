import { randomUUID } from 'crypto';

function checkDirectionInY(direction: PlayerDirection) {
  return direction === PlayerDirection.UP || direction === PlayerDirection.DOWN;
}

function checkDirectionInX(direction: PlayerDirection) {
  return (
    direction === PlayerDirection.RIGHT || direction === PlayerDirection.LEFT
  );
}

export enum PlayerDirection {
  UP,
  DOWN,
  LEFT,
  RIGHT,
}

class TransformPosition {
  x: number;
  y: number;
}

export class PlayerCell {
  constructor(
    public position: TransformPosition,
    public nextCell: PlayerCell | undefined = undefined,
    public previousCell: PlayerCell | undefined = undefined,
    public id = randomUUID(),
  ) {}
}

export class Player {
  constructor(startX: number, startY: number) {
    this.addHead({ x: startX, y: startY - 2 });
    this.addHead({ x: startX, y: startY - 1 });
    this.addHead({ x: startX, y: startY });
  }

  id = randomUUID();

  private _direction: PlayerDirection = PlayerDirection.UP;
  public get direction() {
    return this._direction;
  }
  public set direction(value: PlayerDirection) {
    const directionInY = checkDirectionInY(this._direction);

    if (directionInY && checkDirectionInY(value)) return;

    const directionInX = checkDirectionInX(this._direction);

    if (directionInX && checkDirectionInX(value)) return;

    this._direction = value;
  }

  head: PlayerCell;
  tail: PlayerCell;

  private _cells: PlayerCell[] = [];
  public get cells() {
    return this._cells;
  }

  private addHead(position: TransformPosition) {
    if (this.head) {
      const newHead = new PlayerCell(position);

      this.head.nextCell = newHead;
      newHead.previousCell = this.head;

      this.head = newHead;

      this._cells.push(newHead);
    } else {
      const cell = new PlayerCell(position);

      this.head = cell;
      this.tail = cell;
      this._cells.push(cell);
    }
  }

  private removeTail() {
    if (this.tail && this.tail.nextCell) {
      const beforeTail = this.tail.nextCell;

      beforeTail.previousCell = null;

      this._cells = this._cells.filter((cell) => cell.id !== this.tail.id);

      this.tail = beforeTail;
    }
  }

  move() {
    switch (this.direction) {
      case PlayerDirection.UP:
        this.addHead({ ...this.head.position, y: this.head.position.y + 1 });
        this.removeTail();
        break;

      case PlayerDirection.DOWN:
        this.addHead({ ...this.head.position, y: this.head.position.y - 1 });
        this.removeTail();
        break;

      case PlayerDirection.LEFT:
        this.addHead({ ...this.head.position, x: this.head.position.x - 1 });
        this.removeTail();
        break;

      case PlayerDirection.RIGHT:
        this.addHead({ ...this.head.position, x: this.head.position.x + 1 });
        this.removeTail();
        break;
    }
  }
}
