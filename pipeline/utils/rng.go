package utils

import (
	"context"
	"math/rand/v2"

	"github.com/wangyuanchi/shibegems/pipeline/pgdb/postgres"
)

func RollRNG(ctx context.Context, pgq *postgres.Queries, authorID, guildID int64) (*Gem, error) {
	r := rand.Float64()
	var cumulative float64

	multipliers, err := pgq.GetMultipliers(ctx, postgres.GetMultipliersParams{
		UserID:  authorID,
		GuildID: guildID,
	})
	if err != nil {
		return nil, err
	}

	gemMultipliers := map[string]float64{
		"diamond":    multipliers.DiamondMultiplier,
		"sunstone":   multipliers.SunstoneMultiplier,
		"citrine":    multipliers.CitrineMultiplier,
		"topaz":      multipliers.TopazMultiplier,
		"peridot":    multipliers.PeridotMultiplier,
		"jade":       multipliers.JadeMultiplier,
		"aquamarine": multipliers.AquamarineMultiplier,
		"sapphire":   multipliers.SapphireMultiplier,
		"amethyst":   multipliers.AmethystMultiplier,
		"kunzite":    multipliers.KunziteMultiplier,
		"ruby":       multipliers.RubyMultiplier,
		"garnet":     multipliers.GarnetMultiplier,
		"painite":    multipliers.PainiteMultiplier,
	}

	for _, gem := range GEMS {
		cumulative += gem.Chance * gemMultipliers[gem.Name]
		if r < cumulative {
			return &gem, nil
		}
	}

	return nil, nil
}
