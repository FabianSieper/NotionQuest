package main

import (
	"fmt"
	"net/http"

	"github.com/FabianSieper/NotionQuest/internal/api"
	"github.com/FabianSieper/NotionQuest/internal/cache"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/cors"
)

var (
	port = 8080
)

func main() {

	fmt.Printf("INFO - Creating new cache\n")
	cache := cache.NewGameCache()
	server := api.NewServer(cache)
	fmt.Printf("INFO - Successfully created new cache\n")

	fmt.Printf("INFO - Backend is starting\n")

	router := chi.NewRouter()
	router.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"http://localhost:4200"},
		AllowedMethods:   []string{http.MethodGet, http.MethodPost, http.MethodOptions},
		AllowedHeaders:   []string{"Accept", "Content-Type"},
		AllowCredentials: false,
		MaxAge:           300,
	}))

	// Example Notion page: https://fabiansieper.notion.site/Notion-Quest-2c25e55239fb80f78f9df3fa2c2d65d1
	router.Post("/api/loadNotionGame", server.LoadNotionGameHandler)
	router.Get("/api/game/{gameId}", server.GetGameState)

	fmt.Printf("INFO - Backend has started and listening on port %d\n", port)
	http.ListenAndServe(fmt.Sprintf(":%d", port), router)

	fmt.Printf("INFO - Backend has stopped\n")
}
