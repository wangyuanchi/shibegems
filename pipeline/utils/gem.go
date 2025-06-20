package utils

import (
	"context"
	"fmt"
	"math"

	"github.com/wangyuanchi/shibegems/pipeline/pgdb/postgres"
)

type Gem struct {
	Name   string
	Chance float64
	Worth  int64
}

/*
Base value: 100
Exponent: 1.1
*/
func CalculateWorth(chance float64) int64 {
	return int64(100 * math.Pow(1/chance, 1.1))
}

var (
	DIAMOND    = Gem{Name: "diamond", Chance: 1.0 / 4, Worth: CalculateWorth(1.0 / 4)}
	SUNSTONE   = Gem{Name: "sunstone", Chance: 1.0 / 8, Worth: CalculateWorth(1.0 / 8)}
	CITRINE    = Gem{Name: "citrine", Chance: 1.0 / 16, Worth: CalculateWorth(1.0 / 16)}
	TOPAZ      = Gem{Name: "topaz", Chance: 1.0 / 32, Worth: CalculateWorth(1.0 / 32)}
	PERIDOT    = Gem{Name: "peridot", Chance: 1.0 / 64, Worth: CalculateWorth(1.0 / 64)}
	JADE       = Gem{Name: "jade", Chance: 1.0 / 128, Worth: CalculateWorth(1.0 / 128)}
	AQUAMARINE = Gem{Name: "aquamarine", Chance: 1.0 / 256, Worth: CalculateWorth(1.0 / 256)}
	SAPPHIRE   = Gem{Name: "sapphire", Chance: 1.0 / 512, Worth: CalculateWorth(1.0 / 512)}
	AMETHYST   = Gem{Name: "amethyst", Chance: 1.0 / 1024, Worth: CalculateWorth(1.0 / 1024)}
	KUNZITE    = Gem{Name: "kunzite", Chance: 1.0 / 2048, Worth: CalculateWorth(1.0 / 2048)}
	RUBY       = Gem{Name: "ruby", Chance: 1.0 / 4096, Worth: CalculateWorth(1.0 / 4096)}
	GARNET     = Gem{Name: "garnet", Chance: 1.0 / 8192, Worth: CalculateWorth(1.0 / 8192)}
	PAINITE    = Gem{Name: "painite", Chance: 1.0 / 131072, Worth: CalculateWorth(1.0 / 16384)}

	GEMS = []Gem{
		DIAMOND,
		SUNSTONE,
		CITRINE,
		TOPAZ,
		PERIDOT,
		JADE,
		AQUAMARINE,
		SAPPHIRE,
		AMETHYST,
		KUNZITE,
		RUBY,
		GARNET,
		PAINITE,
	}
)

func UpdateGemAndNetworth(ctx context.Context, pgq *postgres.Queries, authorID, guildID int64, gemName string, amount int32) error {
	switch gemName {
	case "diamond":
		_, err := pgq.UpdateDiamond(ctx, postgres.UpdateDiamondParams{
			UserID:  authorID,
			GuildID: guildID,
			Diamond: amount,
		})
		if err != nil {
			return err
		}
		_, err = pgq.UpdateNetworth(ctx, postgres.UpdateNetworthParams{
			UserID:   authorID,
			GuildID:  guildID,
			Networth: int64(amount) * DIAMOND.Worth,
		})
		return err

	case "sunstone":
		_, err := pgq.UpdateSunstone(ctx, postgres.UpdateSunstoneParams{
			UserID:   authorID,
			GuildID:  guildID,
			Sunstone: amount,
		})
		if err != nil {
			return err
		}
		_, err = pgq.UpdateNetworth(ctx, postgres.UpdateNetworthParams{
			UserID:   authorID,
			GuildID:  guildID,
			Networth: int64(amount) * SUNSTONE.Worth,
		})
		return err

	case "citrine":
		_, err := pgq.UpdateCitrine(ctx, postgres.UpdateCitrineParams{
			UserID:  authorID,
			GuildID: guildID,
			Citrine: amount,
		})
		if err != nil {
			return err
		}
		_, err = pgq.UpdateNetworth(ctx, postgres.UpdateNetworthParams{
			UserID:   authorID,
			GuildID:  guildID,
			Networth: int64(amount) * CITRINE.Worth,
		})
		return err

	case "topaz":
		_, err := pgq.UpdateTopaz(ctx, postgres.UpdateTopazParams{
			UserID:  authorID,
			GuildID: guildID,
			Topaz:   amount,
		})
		if err != nil {
			return err
		}
		_, err = pgq.UpdateNetworth(ctx, postgres.UpdateNetworthParams{
			UserID:   authorID,
			GuildID:  guildID,
			Networth: int64(amount) * TOPAZ.Worth,
		})
		return err

	case "peridot":
		_, err := pgq.UpdatePeridot(ctx, postgres.UpdatePeridotParams{
			UserID:  authorID,
			GuildID: guildID,
			Peridot: amount,
		})
		if err != nil {
			return err
		}
		_, err = pgq.UpdateNetworth(ctx, postgres.UpdateNetworthParams{
			UserID:   authorID,
			GuildID:  guildID,
			Networth: int64(amount) * PERIDOT.Worth,
		})
		return err

	case "jade":
		_, err := pgq.UpdateJade(ctx, postgres.UpdateJadeParams{
			UserID:  authorID,
			GuildID: guildID,
			Jade:    amount,
		})
		if err != nil {
			return err
		}
		_, err = pgq.UpdateNetworth(ctx, postgres.UpdateNetworthParams{
			UserID:   authorID,
			GuildID:  guildID,
			Networth: int64(amount) * JADE.Worth,
		})
		return err

	case "aquamarine":
		_, err := pgq.UpdateAquamarine(ctx, postgres.UpdateAquamarineParams{
			UserID:     authorID,
			GuildID:    guildID,
			Aquamarine: amount,
		})
		if err != nil {
			return err
		}
		_, err = pgq.UpdateNetworth(ctx, postgres.UpdateNetworthParams{
			UserID:   authorID,
			GuildID:  guildID,
			Networth: int64(amount) * AQUAMARINE.Worth,
		})
		return err

	case "sapphire":
		_, err := pgq.UpdateSapphire(ctx, postgres.UpdateSapphireParams{
			UserID:   authorID,
			GuildID:  guildID,
			Sapphire: amount,
		})
		if err != nil {
			return err
		}
		_, err = pgq.UpdateNetworth(ctx, postgres.UpdateNetworthParams{
			UserID:   authorID,
			GuildID:  guildID,
			Networth: int64(amount) * SAPPHIRE.Worth,
		})
		return err

	case "amethyst":
		_, err := pgq.UpdateAmethyst(ctx, postgres.UpdateAmethystParams{
			UserID:   authorID,
			GuildID:  guildID,
			Amethyst: amount,
		})
		if err != nil {
			return err
		}
		_, err = pgq.UpdateNetworth(ctx, postgres.UpdateNetworthParams{
			UserID:   authorID,
			GuildID:  guildID,
			Networth: int64(amount) * AMETHYST.Worth,
		})
		return err

	case "kunzite":
		_, err := pgq.UpdateKunzite(ctx, postgres.UpdateKunziteParams{
			UserID:  authorID,
			GuildID: guildID,
			Kunzite: amount,
		})
		if err != nil {
			return err
		}
		_, err = pgq.UpdateNetworth(ctx, postgres.UpdateNetworthParams{
			UserID:   authorID,
			GuildID:  guildID,
			Networth: int64(amount) * KUNZITE.Worth,
		})
		return err

	case "ruby":
		_, err := pgq.UpdateRuby(ctx, postgres.UpdateRubyParams{
			UserID:  authorID,
			GuildID: guildID,
			Ruby:    amount,
		})
		if err != nil {
			return err
		}
		_, err = pgq.UpdateNetworth(ctx, postgres.UpdateNetworthParams{
			UserID:   authorID,
			GuildID:  guildID,
			Networth: int64(amount) * RUBY.Worth,
		})
		return err

	case "garnet":
		_, err := pgq.UpdateGarnet(ctx, postgres.UpdateGarnetParams{
			UserID:  authorID,
			GuildID: guildID,
			Garnet:  amount,
		})
		if err != nil {
			return err
		}
		_, err = pgq.UpdateNetworth(ctx, postgres.UpdateNetworthParams{
			UserID:   authorID,
			GuildID:  guildID,
			Networth: int64(amount) * GARNET.Worth,
		})
		return err

	case "painite":
		_, err := pgq.UpdatePainite(ctx, postgres.UpdatePainiteParams{
			UserID:  authorID,
			GuildID: guildID,
			Painite: amount,
		})
		if err != nil {
			return err
		}
		_, err = pgq.UpdateNetworth(ctx, postgres.UpdateNetworthParams{
			UserID:   authorID,
			GuildID:  guildID,
			Networth: int64(amount) * PAINITE.Worth,
		})
		return err

	default:
		return fmt.Errorf("'%v' is unsupported for UpdateGemAndNetworth()", gemName)
	}
}
