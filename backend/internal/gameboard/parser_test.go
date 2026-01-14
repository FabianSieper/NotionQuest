package gameboard

import (
	"strings"
	"testing"

	"github.com/FabianSieper/StepOrDie/internal/models/response"
)

func TestParseScenarioInvalidRowLength(t *testing.T) {
	raw := "##\n#"
	_, err := ParseScenario(raw)
	if err == nil {
		t.Fatalf("ParseScenario should fail on inconsistent row lengths")
	}
	if !strings.Contains(err.Error(), `row 1 ("#")`) {
		t.Fatalf("expected detailed row length error, got %v", err)
	}
}

func TestParseScenarioTooFewRows(t *testing.T) {
	raw := "##"
	_, err := ParseScenario(raw)
	if err == nil {
		t.Fatalf("ParseScenario should fail when provided less than two rows")
	}
	if !strings.Contains(err.Error(), "amount of rows is too small") {
		t.Fatalf("expected too few rows error, got %v", err)
	}
}

func TestParseGridValid(t *testing.T) {
	rows := []string{
		"##",
		"S.",
		"MZ",
	}

	grid, err := parseGrid(rows)
	if err != nil {
		t.Fatalf("parseGrid returned unexpected error: %v", err)
	}

	if len(grid) != len(rows) {
		t.Fatalf("expected %d rows, got %d", len(rows), len(grid))
	}
	if len(grid[0]) != len(rows[0]) || len(grid[1]) != len(rows[1]) || len(grid[2]) != len(rows[2]) {
		t.Fatalf("grid columns don't match input rows")
	}
	if grid[0][0] != response.TileWall || grid[1][0] != response.TileFloor || grid[2][1] != response.TileGoal {
		t.Fatalf("grid contents mismatch expected types")
	}
}

func TestParseGridInvalidCharacter(t *testing.T) {
	rows := []string{"#X"}
	_, err := parseGrid(rows)
	if err == nil {
		t.Fatalf("parseGrid should fail when encountering an invalid character")
	}
	if !strings.Contains(err.Error(), "invalid tile character") {
		t.Fatalf("parseGrid error should mention invalid tile character, got %v", err)
	}
}

func TestParseTileValid(t *testing.T) {
	testCases := map[rune]response.TileType{
		'#': response.TileWall,
		'.': response.TileFloor,
		'Z': response.TileGoal,
		'S': response.TileFloor,
		'M': response.TileFloor,
	}

	for input, expected := range testCases {
		tile, err := parseTile(input)
		if err != nil {
			t.Fatalf("parseTile(%q) returned unexpected error: %v", input, err)
		}
		if tile != expected {
			t.Fatalf("parseTile(%q) = %v, expected %v", input, tile, expected)
		}
	}
}

func TestParseTileInvalid(t *testing.T) {
	tile, err := parseTile('X')
	if err == nil {
		t.Fatalf("parseTile('X') expected error, got nil (tile=%v)", tile)
	}
	if tile != response.TileUnknown {
		t.Fatalf("parseTile('X') returned tile %v, expected %v", tile, response.TileUnknown)
	}
}
