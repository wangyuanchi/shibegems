package utils

import (
	"math/rand/v2"
)

func RollRNG() *Gem {
	r := rand.Float64()
	var cumulative float64

	for _, gem := range GEMS {
		cumulative += gem.Chance
		if r < cumulative {
			return &gem
		}
	}
	return nil
}
