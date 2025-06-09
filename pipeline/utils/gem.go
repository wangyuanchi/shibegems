package utils

import (
	"context"
	"fmt"

	"github.com/wangyuanchi/shibegems/pipeline/pgdb/postgres"
)

type Gem struct {
	Name   string
	Chance float64
}

// Total: 0.499887011
var (
	Diamond    = Gem{Name: "diamond", Chance: 1.0 / 4}
	Sunstone   = Gem{Name: "sunstone", Chance: 1.0 / 8}
	Citrine    = Gem{Name: "citrine", Chance: 1.0 / 16}
	Topaz      = Gem{Name: "topaz", Chance: 1.0 / 32}
	Peridot    = Gem{Name: "peridot", Chance: 1.0 / 64}
	Jade       = Gem{Name: "jade", Chance: 1.0 / 128}
	Aquamarine = Gem{Name: "aquamarine", Chance: 1.0 / 256}
	Sapphire   = Gem{Name: "sapphire", Chance: 1.0 / 512}
	Amethyst   = Gem{Name: "amethyst", Chance: 1.0 / 1024}
	Kunzite    = Gem{Name: "kunzite", Chance: 1.0 / 2048}
	Ruby       = Gem{Name: "ruby", Chance: 1.0 / 4096}
	Garnet     = Gem{Name: "garnet", Chance: 1.0 / 8192}
	Painite    = Gem{Name: "painite", Chance: 1.0 / 100000}

	Gems = []Gem{
		Diamond,
		Sunstone,
		Citrine,
		Topaz,
		Peridot,
		Jade,
		Aquamarine,
		Sapphire,
		Amethyst,
		Kunzite,
		Ruby,
		Garnet,
		Painite,
	}
)

func UpsertGem(ctx context.Context, pgq *postgres.Queries, authorID, guildID int64, gemName string, amount int32) error {
	switch gemName {
	case "diamond":
		_, err := pgq.UpsertDiamond(ctx, postgres.UpsertDiamondParams{
			UserID:  authorID,
			GuildID: guildID,
			Diamond: amount,
		})
		return err
	case "sunstone":
		_, err := pgq.UpsertSunstone(ctx, postgres.UpsertSunstoneParams{
			UserID:   authorID,
			GuildID:  guildID,
			Sunstone: amount,
		})
		return err
	case "citrine":
		_, err := pgq.UpsertCitrine(ctx, postgres.UpsertCitrineParams{
			UserID:  authorID,
			GuildID: guildID,
			Citrine: amount,
		})
		return err
	case "topaz":
		_, err := pgq.UpsertTopaz(ctx, postgres.UpsertTopazParams{
			UserID:  authorID,
			GuildID: guildID,
			Topaz:   amount,
		})
		return err
	case "peridot":
		_, err := pgq.UpsertPeridot(ctx, postgres.UpsertPeridotParams{
			UserID:  authorID,
			GuildID: guildID,
			Peridot: amount,
		})
		return err
	case "jade":
		_, err := pgq.UpsertJade(ctx, postgres.UpsertJadeParams{
			UserID:  authorID,
			GuildID: guildID,
			Jade:    amount,
		})
		return err
	case "aquamarine":
		_, err := pgq.UpsertAquamarine(ctx, postgres.UpsertAquamarineParams{
			UserID:     authorID,
			GuildID:    guildID,
			Aquamarine: amount,
		})
		return err
	case "sapphire":
		_, err := pgq.UpsertSapphire(ctx, postgres.UpsertSapphireParams{
			UserID:   authorID,
			GuildID:  guildID,
			Sapphire: amount,
		})
		return err
	case "amethyst":
		_, err := pgq.UpsertAmethyst(ctx, postgres.UpsertAmethystParams{
			UserID:   authorID,
			GuildID:  guildID,
			Amethyst: amount,
		})
		return err
	case "kunzite":
		_, err := pgq.UpsertKunzite(ctx, postgres.UpsertKunziteParams{
			UserID:  authorID,
			GuildID: guildID,
			Kunzite: amount,
		})
		return err
	case "ruby":
		_, err := pgq.UpsertRuby(ctx, postgres.UpsertRubyParams{
			UserID:  authorID,
			GuildID: guildID,
			Ruby:    amount,
		})
		return err
	case "garnet":
		_, err := pgq.UpsertGarnet(ctx, postgres.UpsertGarnetParams{
			UserID:  authorID,
			GuildID: guildID,
			Garnet:  amount,
		})
		return err
	case "painite":
		_, err := pgq.UpsertPainite(ctx, postgres.UpsertPainiteParams{
			UserID:  authorID,
			GuildID: guildID,
			Painite: amount,
		})
		return err
	default:
		return fmt.Errorf("'%v' is unsupported for UpsertGem()", gemName)
	}
}
