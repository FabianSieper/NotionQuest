package config

import (
	"fmt"
	"os"

	"github.com/joho/godotenv"
)

func GetNotionAccessKey() (error, string) {
	secret := os.Getenv("NOTION_FEEDBACK_INTEGRATION_SECRET")

	if len(secret) == 0 {
		return fmt.Errorf("Notion feedback integration secret could be loaded"), ""
	}

	return nil, secret
}

func GetNotionFeedbackDatabaseId() (error, string) {
	databaseId := os.Getenv("NOTION_FEEDBACK_DATABASE_ID")

	if len(databaseId) == 0 {
		return fmt.Errorf("Notion feedback database id could be loaded"), ""
	}

	return nil, databaseId
}

func LoadDotEnv() error {
	if err := godotenv.Load("../.env"); err != nil {
		return err
	}
	return nil
}
