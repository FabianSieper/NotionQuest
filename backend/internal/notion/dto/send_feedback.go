package dto

type SendFeedbackToNotionRequest struct {
	Parent     NotionParent             `json:"parent"`
	Properties NotionFeedbackProperties `json:"properties"`
}

type NotionParent struct {
	Type       string `json:"type"`
	DatabaseID string `json:"database_id"`
}

type NotionFeedbackProperties struct {
	Name     NotionTitleProperty    `json:"Name"`
	Feedback NotionRichTextProperty `json:"Feedback"`
}

type NotionTitleProperty struct {
	Title []NotionTextBlock `json:"title"`
}

type NotionRichTextProperty struct {
	RichText []NotionTextBlock `json:"rich_text"`
}

type NotionTextBlock struct {
	Text NotionTextContent `json:"text"`
}

type NotionTextContent struct {
	Content string `json:"content"`
}
