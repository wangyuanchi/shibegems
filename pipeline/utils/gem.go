package utils

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
