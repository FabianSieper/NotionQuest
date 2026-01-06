package config

import (
	"errors"
	"fmt"
	"io/fs"
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
	candidates := []string{".env", "../.env"}
	var loadErr error
	for _, path := range candidates {
		if err := godotenv.Overload(path); err != nil {
			if errors.Is(err, fs.ErrNotExist) {
				loadErr = err
				continue
			}
			return err
		}
		return nil
	}
	if loadErr != nil {
		return fmt.Errorf("no .env file found in %v", candidates)
	}
	return nil
}
