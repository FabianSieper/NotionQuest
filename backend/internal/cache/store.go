package cache

import (
	"sync"

	"github.com/FabianSieper/NotionQuest/internal/models"
)

// GameCache keeps parsed Notion boards in memory for reuse.
type GameCache struct {
	mu    sync.RWMutex
	games map[string]models.GameState
}

// NewGameCache creates an empty cache instance.
func NewGameCache() *GameCache {
	return &GameCache{
		games: make(map[string]models.GameState, 0),
	}
}

// Get attempts to fetch a cached entry by key.
func (c *GameCache) Get(notionSiteId string) (models.GameState, bool) {
	c.mu.RLock()
	defer c.mu.RUnlock()

	val, ok := c.games[notionSiteId]
	return val, ok
}

// Set stores or overwrites a cached entry.
func (c *GameCache) Set(key string, value models.GameState) {
	c.mu.Lock()
	defer c.mu.Unlock()

	c.games[key] = value
}
