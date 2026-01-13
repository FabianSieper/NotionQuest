package api

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/FabianSieper/StepOrDie/internal/cache"
	"github.com/go-chi/chi/v5"
)

type Server struct {
	Cache *cache.GameCache
}

func NewServer(cache *cache.GameCache) *Server {
	return &Server{
		Cache: cache,
	}
}

func (s *Server) LoadGameStateFromCache(w http.ResponseWriter, r *http.Request) {

	gameId := chi.URLParam(r, "gameId")

	if gameId == "" {
		http.Error(w, "path parameter 'gameId' was empty but has to be defined", http.StatusBadRequest)
		return
	}

	// Load game
	fmt.Printf("INFO - Trying to load game with id %s\n", gameId)
	gameState, ok := s.Cache.Get(gameId)

	if !ok {
		http.Error(w, fmt.Sprintf("game with gameId %s was not found in cache", gameId), http.StatusNotFound)
		return
	}
	fmt.Printf("INFO - Successfully loaded game with id %s\n", gameId)

	w.Header().Set("Content-Type", "application/json")
	err := json.NewEncoder(w).Encode(gameState)

	if err != nil {
		http.Error(w, "Could not encode game state", http.StatusInternalServerError)
		return
	}
}
