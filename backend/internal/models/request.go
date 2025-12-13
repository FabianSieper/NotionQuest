package models

type LoadGameStateFromNotionRequestBody struct {
	NotionUrl string `json:"notionUrl"`
	Overwrite bool   `json:"overwrite"`
}
