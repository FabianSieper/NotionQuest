package request

// Request body models to this backend

type LoadGameStateFromNotionRequestBody struct {
	NotionUrl string `json:"notionUrl"`
	Overwrite bool   `json:"overwrite"`
}
