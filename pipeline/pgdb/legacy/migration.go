package legacy

import (
	"context"
	"encoding/json"
	"log"
	"os"

	"github.com/wangyuanchi/shibegems/pipeline/pgdb/postgres"
	"github.com/wangyuanchi/shibegems/pipeline/utils"
)

func Migrate(ctx context.Context, pgq *postgres.Queries, dataPath string, run bool) {
	if !run {
		return
	} else {
		log.Printf("Running data migration...")
	}

	data, err := os.ReadFile(dataPath)
	if err != nil {
		log.Printf("Failed to read file: %v", err)
		return
	}

	var users [][]int64
	if err := json.Unmarshal(data, &users); err != nil {
		log.Printf("Failed to unmarshal JSON: %v", err)
		return
	}

	for _, user := range users {
		err := pgq.CreateProfile(ctx, postgres.CreateProfileParams{
			UserID:  user[0],
			GuildID: 321288057263357972,
		})
		if err != nil {
			log.Printf("Migration error: %v", err)
			return
		}

		err = pgq.CreateGems(ctx, postgres.CreateGemsParams{
			UserID:  user[0],
			GuildID: 321288057263357972,
		})
		if err != nil {
			log.Printf("Migration error: %v", err)
			return
		}

		_, err = pgq.UpdateAllGems(ctx, postgres.UpdateAllGemsParams{
			UserID:     user[0],
			GuildID:    321288057263357972,
			Diamond:    int32(user[1]),
			Sunstone:   int32(user[2]),
			Citrine:    int32(user[3]),
			Topaz:      int32(user[4]),
			Peridot:    int32(user[5]),
			Jade:       int32(user[6]),
			Aquamarine: int32(user[7]),
			Sapphire:   int32(user[8]),
			Amethyst:   int32(user[9]),
			Kunzite:    int32(user[10]),
			Ruby:       int32(user[11]),
			Garnet:     int32(user[12]),
			Painite:    int32(user[13]),
		})
		if err != nil {
			log.Printf("Migration error: %v", err)
			return
		}

		networth := int32(user[1])*utils.DIAMOND.Worth +
			int32(user[2])*utils.SUNSTONE.Worth +
			int32(user[3])*utils.CITRINE.Worth +
			int32(user[4])*utils.TOPAZ.Worth +
			int32(user[5])*utils.PERIDOT.Worth +
			int32(user[6])*utils.JADE.Worth +
			int32(user[7])*utils.AQUAMARINE.Worth +
			int32(user[8])*utils.SAPPHIRE.Worth +
			int32(user[9])*utils.AMETHYST.Worth +
			int32(user[10])*utils.KUNZITE.Worth +
			int32(user[11])*utils.RUBY.Worth +
			int32(user[12])*utils.GARNET.Worth +
			int32(user[13])*utils.PAINITE.Worth

		_, err = pgq.UpdateNetworth(ctx, postgres.UpdateNetworthParams{
			UserID:   user[0],
			GuildID:  321288057263357972,
			Networth: networth,
		})
		if err != nil {
			log.Printf("Migration error: %v", err)
			return
		}
	}

	log.Println("Migration successful")
}
