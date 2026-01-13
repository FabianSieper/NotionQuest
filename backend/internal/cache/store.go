package cache

import (
	"sync"

	"github.com/FabianSieper/StepOrDie/internal/models/response"
)

// GameCache keeps parsed Notion boards in memory for reuse.
type GameCache struct {
	mu    sync.RWMutex
	games map[string]response.GameState
}

// NewGameCache creates an empty cache instance.
func NewGameCache() *GameCache {
	return &GameCache{
		games: make(map[string]response.GameState, 0),
	}
}

// Get attempts to fetch a cached entry by key.
func (c *GameCache) Get(notionSiteId string) (response.GameState, bool) {
	c.mu.RLock()
	defer c.mu.RUnlock()

	val, ok := c.games[notionSiteId]
	return val, ok
}

// Set stores or overwrites a cached entry.
func (c *GameCache) Set(key string, value response.GameState) {
	c.mu.Lock()
	defer c.mu.Unlock()

	c.games[key] = value
}
