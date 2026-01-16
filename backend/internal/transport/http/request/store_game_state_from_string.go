package request

type StoreGameStateFromStringRequestBody struct {
	GameId       string `json:"gameId"`
	PlayingBoard string `json:"playingBoard"`
	Overwrite    bool   `json:"overwrite"`
}
