import { Player, PlayerCell, PlayerDirection } from './Player';

// passing through each cell and return amount of cells counted
function eachCell(cell: PlayerCell) {
  let amountOfCells = 1;

  const recursive = (cell: PlayerCell) => {
    if (cell.previousCell) {
      amountOfCells += 1;
      recursive(cell.previousCell);
    }

    return amountOfCells;
  };

  return recursive(cell);
}

describe('PlayerModel', () => {
  it('able to instantiate a player', () => {
    const player = new Player(0, 0);

    expect(eachCell(player.head)).toBe(3);
    expect(player.cells.length).toBe(3);

    expect(player.head.position).toEqual({ x: 0, y: 0 });
    expect(player.head.previousCell.position).toEqual({ x: 0, y: -1 });
    expect(player.head.previousCell.previousCell.position).toEqual({
      x: 0,
      y: -2,
    });

    expect(player.direction).toBe(PlayerDirection.UP);

    //

    const player2 = new Player(5, 8);

    expect(eachCell(player2.head)).toBe(3);
    expect(player2.cells.length).toBe(3);

    expect(player2.head.position).toEqual({ x: 5, y: 8 });
    expect(player2.head.previousCell.position).toEqual({ x: 5, y: 7 });
    expect(player2.head.previousCell.previousCell.position).toEqual({
      x: 5,
      y: 6,
    });
  });

  it('not able to set direction to up begin down and vise-versa', () => {
    const player = new Player(0, 0);

    expect(player.direction).toBe(PlayerDirection.UP);

    // UP -NO-> DOWN
    player.direction = PlayerDirection.DOWN;
    expect(player.direction).toBe(PlayerDirection.UP);
    player.move();
    expect(player.direction).toBe(PlayerDirection.UP);

    // UP -YES-> LEFT
    player.direction = PlayerDirection.LEFT;
    expect(player.direction).toBe(PlayerDirection.UP);
    player.move();
    expect(player.direction).toBe(PlayerDirection.LEFT);

    // LEFT -YES-> DOWN
    player.direction = PlayerDirection.DOWN;
    expect(player.direction).toBe(PlayerDirection.LEFT);
    player.move();
    expect(player.direction).toBe(PlayerDirection.DOWN);

    // DOWN -NO-> UP
    player.direction = PlayerDirection.UP;
    expect(player.direction).toBe(PlayerDirection.DOWN);
    player.move();
    expect(player.direction).toBe(PlayerDirection.DOWN);

    // DOWN -YES-> RIGHT
    player.direction = PlayerDirection.RIGHT;
    expect(player.direction).toBe(PlayerDirection.DOWN);
    player.move();
    expect(player.direction).toBe(PlayerDirection.RIGHT);

    // RIGHT -YES-> UP
    player.direction = PlayerDirection.UP;
    expect(player.direction).toBe(PlayerDirection.RIGHT);
    player.move();
    expect(player.direction).toBe(PlayerDirection.UP);
  });

  it('not able to set direction to left begin right and vise-versa', () => {
    const player = new Player(0, 0);

    expect(player.direction).toBe(PlayerDirection.UP);

    // UP -YES-> RIGHT
    player.direction = PlayerDirection.RIGHT;
    expect(player.direction).toBe(PlayerDirection.UP);
    player.move();
    expect(player.direction).toBe(PlayerDirection.RIGHT);

    // RIGHT -NO-> LEFT
    player.direction = PlayerDirection.LEFT;
    expect(player.direction).toBe(PlayerDirection.RIGHT);
    player.move();
    expect(player.direction).toBe(PlayerDirection.RIGHT);

    // RIGHT -YES-> DOWN
    player.direction = PlayerDirection.DOWN;
    expect(player.direction).toBe(PlayerDirection.RIGHT);
    player.move();
    expect(player.direction).toBe(PlayerDirection.DOWN);

    // DOWN -YES-> LEFT
    player.direction = PlayerDirection.LEFT;
    expect(player.direction).toBe(PlayerDirection.DOWN);
    player.move();
    expect(player.direction).toBe(PlayerDirection.LEFT);

    // LEFT -NO-> RIGHT
    player.direction = PlayerDirection.RIGHT;
    expect(player.direction).toBe(PlayerDirection.LEFT);
    player.move();
    expect(player.direction).toBe(PlayerDirection.LEFT);

    // LEFT -YES-> UP
    player.direction = PlayerDirection.UP;
    expect(player.direction).toBe(PlayerDirection.LEFT);
    player.move();
    expect(player.direction).toBe(PlayerDirection.UP);
  });

  it('able to player move upwards', () => {
    /*
      X = empty space
      0 = player

      from         to
      X X X X X    X X 0 X X
      X X 0 X X    X X 0 X X
      X X 0 X X    X X 0 X X
      X X 0 X X    X X X X X
      X X X X X    X X X X X
    */

    const player = new Player(0, 0);

    const beforeMoveHeadId = player.head.id;
    const beforeMoveTailId = player.tail.id;

    expect(eachCell(player.head)).toBe(3);
    expect(player.head.position).toEqual({ x: 0, y: 0 });
    expect(player.head.previousCell.position).toEqual({ x: 0, y: -1 });
    expect(player.head.previousCell.previousCell.position).toEqual({
      x: 0,
      y: -2,
    });

    expect(player.direction).toBe(PlayerDirection.UP);
    player.move();

    expect(eachCell(player.head)).toBe(3);
    expect(player.cells.length).toBe(3);

    expect(beforeMoveHeadId).not.toBe(player.head.id);
    expect(beforeMoveTailId).not.toBe(player.tail.id);

    expect(player.head.position).toEqual({ x: 0, y: 1 });
    expect(player.head.previousCell.position).toEqual({ x: 0, y: 0 });
    expect(player.head.previousCell.previousCell.position).toEqual({
      x: 0,
      y: -1,
    });
  });

  it('able to player move downwards', () => {
    /*
      X = empty space
      0 = player

      from                    to
      X X X X X   X X X X X   X X X X X
      x x 0 X X   X 0 0 X X   X 0 0 X X
      X X 0 X X   X X 0 X X   X 0 X X X
      X X 0 X X   X X X X X   X X X X X
      X X X X X   X X X X X   X X X X X
    */

    const player = new Player(0, 0);

    const beforeMoveHeadId = player.head.id;
    const beforeMoveTailId = player.tail.id;

    expect(eachCell(player.head)).toBe(3);

    player.direction = PlayerDirection.LEFT;
    player.move();
    player.direction = PlayerDirection.DOWN;
    player.move();
    expect(player.direction).toBe(PlayerDirection.DOWN);

    expect(eachCell(player.head)).toBe(3);
    expect(player.cells.length).toBe(3);

    expect(beforeMoveHeadId).not.toBe(player.head.id);
    expect(beforeMoveTailId).not.toBe(player.tail.id);

    expect(player.head.position).toEqual({ x: -1, y: -1 });
    expect(player.head.previousCell.position).toEqual({ x: -1, y: 0 });
    expect(player.head.previousCell.previousCell.position).toEqual({
      x: 0,
      y: 0,
    });
  });

  it('able to player move leftwards', () => {
    /*
      X = empty space
      0 = player

      from         to
      X X X X X    X X X X X
      X X 0 X X    X 0 0 X X
      X X 0 X X    X X 0 X X
      X X 0 X X    X X X X X
      X X X X X    X X X X X
    */

    const player = new Player(0, 0);

    const beforeMoveHeadId = player.head.id;
    const beforeMoveTailId = player.tail.id;

    expect(eachCell(player.head)).toBe(3);
    expect(player.head.position).toEqual({ x: 0, y: 0 });
    expect(player.head.previousCell.position).toEqual({ x: 0, y: -1 });
    expect(player.head.previousCell.previousCell.position).toEqual({
      x: 0,
      y: -2,
    });

    player.direction = PlayerDirection.LEFT;
    player.move();
    expect(player.direction).toBe(PlayerDirection.LEFT);

    expect(eachCell(player.head)).toBe(3);
    expect(player.cells.length).toBe(3);

    expect(beforeMoveHeadId).not.toBe(player.head.id);
    expect(beforeMoveTailId).not.toBe(player.tail.id);

    expect(player.head.position).toEqual({ x: -1, y: 0 });
    expect(player.head.previousCell.position).toEqual({ x: 0, y: 0 });
    expect(player.head.previousCell.previousCell.position).toEqual({
      x: 0,
      y: -1,
    });
  });

  it('able to player move rightwards', () => {
    /*
      X = empty space
      0 = player

      from         to
      X X X X X    X X X X X
      X X 0 X X    X X 0 0 X
      X X 0 X X    X X 0 X X
      X X 0 X X    X X X X X
      X X X X X    X X X X X
    */

    const player = new Player(0, 0);

    const beforeMoveHeadId = player.head.id;
    const beforeMoveTailId = player.tail.id;

    expect(eachCell(player.head)).toBe(3);
    expect(player.head.position).toEqual({ x: 0, y: 0 });
    expect(player.head.previousCell.position).toEqual({ x: 0, y: -1 });
    expect(player.head.previousCell.previousCell.position).toEqual({
      x: 0,
      y: -2,
    });

    player.direction = PlayerDirection.RIGHT;
    player.move();
    expect(player.direction).toBe(PlayerDirection.RIGHT);

    expect(eachCell(player.head)).toBe(3);
    expect(player.cells.length).toBe(3);

    expect(beforeMoveHeadId).not.toBe(player.head.id);
    expect(beforeMoveTailId).not.toBe(player.tail.id);

    expect(player.head.position).toEqual({ x: 1, y: 0 });
    expect(player.head.previousCell.position).toEqual({ x: 0, y: 0 });
    expect(player.head.previousCell.previousCell.position).toEqual({
      x: 0,
      y: -1,
    });
  });
});
