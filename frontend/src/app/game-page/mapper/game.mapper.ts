import { GameState } from '../../model/load-game-state-response.model';
import { Game, GameElement, PlayingBoard, SpriteDetails } from '../model/game.model';

var playingBoardPixelsX = 1000;
var playingBoardPixelsY = 1000;

export async function mapToGame(gameState: GameState): Promise<Game> {
  return {
    player: await extractPlayer(gameState),
    playingBoard: extractPlayingBoard(gameState),
  };
}

function extractPlayingBoard(gameState: GameState): PlayingBoard {
  return {
    width: playingBoardPixelsX,
    height: playingBoardPixelsY,
    amountFieldsX: gameState.width,
    amountFieldsY: gameState.height,
  };
}

async function extractPlayer(gameState: GameState): Promise<GameElement> {
  const playerSpriteDetails = await createSpriteDetails(
    'assets/sprites/player.png',
    3, // cols
    5, // rows
    // Start at animation frame col 0 and row 4
    0,
    4
  );
  return {
    spriteDetails: playerSpriteDetails,
    position: { x: gameState.player.position.x, y: gameState.player.position.y },
  };
}

async function createSpriteDetails(
  assetsPath: string,
  spriteCols: number,
  spriteRows: number,
  nextAnimationCol: number,
  nextAnimationRow: number
): Promise<SpriteDetails> {
  const player = new Image();
  player.src = assetsPath;
  await player.decode();

  return {
    image: player,
    amountCols: spriteCols,
    amountRows: spriteRows,
    frameWidth: Math.floor(player.naturalWidth / spriteCols),
    frameHeight: Math.floor(player.naturalHeight / spriteRows),
    nextAnimationCol,
    nextAnimationRow,
  };
}
