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

		networth := user[1]*int64(utils.DIAMOND.Worth) +
			user[2]*int64(utils.SUNSTONE.Worth) +
			user[3]*int64(utils.CITRINE.Worth) +
			user[4]*int64(utils.TOPAZ.Worth) +
			user[5]*int64(utils.PERIDOT.Worth) +
			user[6]*int64(utils.JADE.Worth) +
			user[7]*int64(utils.AQUAMARINE.Worth) +
			user[8]*int64(utils.SAPPHIRE.Worth) +
			user[9]*int64(utils.AMETHYST.Worth) +
			user[10]*int64(utils.KUNZITE.Worth) +
			user[11]*int64(utils.RUBY.Worth) +
			user[12]*int64(utils.GARNET.Worth) +
			user[13]*int64(utils.PAINITE.Worth)

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
