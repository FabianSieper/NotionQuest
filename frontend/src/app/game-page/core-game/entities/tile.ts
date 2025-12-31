import { GameElement } from '../../model/game.model';
import { Entity } from './entity';

export class Tile extends Entity {
  constructor(protected floor: GameElement) {
    super(floor);
  }
}
