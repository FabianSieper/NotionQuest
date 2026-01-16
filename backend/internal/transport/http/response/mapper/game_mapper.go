package mapper

import (
	"github.com/FabianSieper/StepOrDie/internal/domain"
	"github.com/FabianSieper/StepOrDie/internal/transport/http/response"
)

func GameFromDomain(game domain.Game) response.Game {
	return response.Game{
		Width:  game.Width,
		Height: game.Height,
		Grid:   mapGrid(game.Grid),
		State:  mapGameState(game.SavedState), // Always return saved state
	}
}

func mapGameState(state domain.GameState) response.GameState {
	enemies := make([]response.Enemy, 0, len(state.Enemies))
	for _, enemy := range state.Enemies {
		enemies = append(enemies, mapEnemy(enemy))
	}

	return response.GameState{
		Player:  response.Player{Position: mapPosition(state.Player.Position)},
		Enemies: enemies,
	}
}

func mapEnemy(enemy domain.Enemy) response.Enemy {
	return response.Enemy{
		ID:       enemy.ID,
		Position: mapPosition(enemy.Position),
		Type:     response.EnemyType(enemy.Type),
	}
}

func mapPosition(position domain.Position) response.Position {
	return response.Position{
		X: position.X,
		Y: position.Y,
	}
}

func mapGrid(grid [][]domain.TileType) [][]response.TileType {
	mapped := make([][]response.TileType, 0, len(grid))
	for _, row := range grid {
		mappedRow := make([]response.TileType, 0, len(row))
		for _, tile := range row {
			mappedRow = append(mappedRow, response.TileType(tile))
		}
		mapped = append(mapped, mappedRow)
	}

	return mapped
}
