package gameboard

import (
	"fmt"
	"strings"

	"github.com/FabianSieper/StepOrDie/internal/models/response"
)

// ParseScenario interprets the textual board, for example:
// ####################
// #S.................#
// #...####...M.......#
// #...#......##......#
// #...#..M...........#
// #..............M...#
// #...####...........#
// #...#..Z...........#
// ####################
func ParseScenario(raw string) (*response.GameState, error) {
	rows := strings.Split(raw, "\n")
	// Rows come from top to bottom, so each string represents the Y axis,
	// while characters within the row walk along the X axis from left to right.

	amountRows, amountCols, err := getAmountRowsAndCols(rows)

	if err != nil {
		return &response.GameState{}, err
	}

	grid, err := parseGrid(rows)

	if err != nil {
		return &response.GameState{}, err
	}

	playerPosition, err := getPlayerPosition(rows)

	if err != nil {
		return &response.GameState{}, err
	}

	enemies := extractEnemies(rows)

	return &response.GameState{
		Width:  amountCols,
		Height: amountRows,
		Grid:   grid,
		Player: response.Player{
			Position: playerPosition,
		},
		Enemies: enemies,
	}, nil
}

func extractEnemies(rows []string) []response.Enemy {
	enemies := make([]response.Enemy, 0)
	index := 1
	for y, row := range rows {
		for x, char := range row {
			if char == 'M' {
				enemyId := fmt.Sprintf("enemy_%d", index)
				enemies = append(enemies, response.Enemy{
					ID:       enemyId,
					Position: response.Position{X: x, Y: y},
					Type:     response.EnemyTypeMonster,
				})
				index++
			}
		}
	}

	return enemies
}

func getPlayerPosition(rows []string) (response.Position, error) {
	var playerPosition response.Position

	for y, row := range rows {
		for x, char := range row {
			if char == 'S' {
				if playerPosition != (response.Position{}) {
					return response.Position{}, fmt.Errorf("multiple occurences of character 'S' found. Only one is allowed.")
				}

				playerPosition = response.Position{X: x, Y: y}
			}
		}
	}

	// If no player was found
	if playerPosition == (response.Position{}) {
		return response.Position{}, fmt.Errorf("player start position 'S' not found")
	}
	// Success, exactly one player position was found
	return playerPosition, nil

}

func parseGrid(rows []string) ([][]response.TileType, error) {

	var grid [][]response.TileType

	for _, row := range rows {
		var gridRow []response.TileType

		for _, char := range row {
			tile, err := parseTile(char)

			if err != nil {
				return [][]response.TileType{}, err
			}
			gridRow = append(gridRow, tile)
		}
		grid = append(grid, gridRow)
	}

	return grid, nil
}

var tileMappings = map[rune]response.TileType{
	'#': response.TileWall,
	'.': response.TileFloor,
	'Z': response.TileGoal,
	'S': response.TileFloor, // start position is represented as floor on the static grid
	'M': response.TileFloor, // monster spawn points become floor on the static grid
}

func parseTile(char rune) (response.TileType, error) {
	if tile, ok := tileMappings[char]; ok {
		return tile, nil
	}
	return response.TileUnknown, fmt.Errorf("invalid tile character: %c", char)
}

func getAmountRowsAndCols(rows []string) (int, int, error) {
	amountRows := len(rows)

	if amountRows < 2 {
		return 0, 0, fmt.Errorf("the amount of rows is too small: %d. The minimum is 2", amountRows)
	}

	if err := ensureRowsSameLength(rows); err != nil {
		return 0, 0, err
	}

	amountCols := len(rows[0])

	if amountRows != amountCols {
		return 0, 0, fmt.Errorf("the board is not square, but should be: %d rows vs %d columns", amountRows, amountCols)
	}

	return amountRows, amountCols, nil
}

func ensureRowsSameLength(rows []string) error {
	if len(rows) == 0 {
		return nil
	}
	expectedLength := len(rows[0])

	for idx, row := range rows {
		if len(row) != expectedLength {
			return fmt.Errorf("row %d (%q) has length %d, expected %d", idx, row, len(row), expectedLength)
		}
	}
	return nil
}
