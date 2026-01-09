import { Game, GameElement } from '../../model/game.model';
import { Direction } from '../model/direction.model';
import { Actor } from './actor';

export class Enemy extends Actor {
  constructor(enemy: GameElement) {
    super(enemy);
  }

  moveRandomly(game: Game, blockedDirections: Direction[] = []): boolean {
    const possibleDirections = this.getPossibleDirections(blockedDirections);
    if (possibleDirections.length === 0) {
      return false; // No possible moves
    }

    const randomDirection = this.getRandomDirection(possibleDirections);

    const movemementWasSuccessful = this.moveInDirection(randomDirection, game);

    if (!movemementWasSuccessful) {
      return this.moveRandomly(game, [...blockedDirections, randomDirection]);
    }
    return true;
  }

  moveSmart(game: Game, blockedDirections: Direction[] = []) {
    const possibleDirections = this.getPossibleDirections(blockedDirections);
    if (possibleDirections.length === 0) {
      return false; // No possible moves
    }

    // TODO: Should contain some sort of smart movement logic
    // Move with this.moveUp(), this.moveRight(), ...

    // TODO: remove for final implemention. Just used for current implementation to work and so that the final implementation
    // is utilized by the program directly.
    this.moveRandomly(game, blockedDirections);

    return true;
  }

  private getPossibleDirections(blockedDirections: Direction[]) {
    if (blockedDirections.length === 4) {
      return []; // No possible moves
    }

    const allDirections = Object.values(Direction);
    return allDirections.filter((direction) => !blockedDirections.includes(direction));
  }

  dance() {
    this.gameElement.visuals.animationDetails.nextCol = 0;
    this.gameElement.visuals.animationDetails.nextRow = 5;
  }

  private getRandomDirection(possibleDirections: Direction[]) {
    return possibleDirections[Math.floor(Math.random() * possibleDirections.length)];
  }

  private moveInDirection(direction: Direction, game: Game): boolean {
    switch (direction) {
      case Direction.UP:
        return this.moveUp(game);
      case Direction.DOWN:
        return this.moveDown(game);
      case Direction.LEFT:
        return this.moveLeft(game);
      case Direction.RIGHT:
        return this.moveRight(game);
      default:
        return false;
    }
  }
}
