-- name: CreateUser :one
INSERT INTO gems (user_id, guild_id, diamond, sunstone, citrine, topaz, peridot, jade, aquamarine, sapphire, amethyst, kunzite, ruby, garnet, painite)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
RETURNING *;

-- name: UpsertDiamond :one
INSERT INTO gems (user_id, guild_id, diamond)
VALUES ($1, $2, $3)
ON CONFLICT (user_id, guild_id)
DO UPDATE SET diamond = gems.diamond + EXCLUDED.diamond
RETURNING user_id, guild_id, diamond;

-- name: UpsertSunstone :one
INSERT INTO gems (user_id, guild_id, sunstone)
VALUES ($1, $2, $3)
ON CONFLICT (user_id, guild_id)
DO UPDATE SET sunstone = gems.sunstone + EXCLUDED.sunstone
RETURNING user_id, guild_id, sunstone;

-- name: UpsertCitrine :one
INSERT INTO gems (user_id, guild_id, citrine)
VALUES ($1, $2, $3)
ON CONFLICT (user_id, guild_id)
DO UPDATE SET citrine = gems.citrine + EXCLUDED.citrine
RETURNING user_id, guild_id, citrine;

-- name: UpsertTopaz :one
INSERT INTO gems (user_id, guild_id, topaz)
VALUES ($1, $2, $3)
ON CONFLICT (user_id, guild_id)
DO UPDATE SET topaz = gems.topaz + EXCLUDED.topaz
RETURNING user_id, guild_id, topaz;

-- name: UpsertPeridot :one
INSERT INTO gems (user_id, guild_id, peridot)
VALUES ($1, $2, $3)
ON CONFLICT (user_id, guild_id)
DO UPDATE SET peridot = gems.peridot + EXCLUDED.peridot
RETURNING user_id, guild_id, peridot;

-- name: UpsertJade :one
INSERT INTO gems (user_id, guild_id, jade)
VALUES ($1, $2, $3)
ON CONFLICT (user_id, guild_id)
DO UPDATE SET jade = gems.jade + EXCLUDED.jade
RETURNING user_id, guild_id, jade;

-- name: UpsertAquamarine :one
INSERT INTO gems (user_id, guild_id, aquamarine)
VALUES ($1, $2, $3)
ON CONFLICT (user_id, guild_id)
DO UPDATE SET aquamarine = gems.aquamarine + EXCLUDED.aquamarine
RETURNING user_id, guild_id, aquamarine;

-- name: UpsertSapphire :one
INSERT INTO gems (user_id, guild_id, sapphire)
VALUES ($1, $2, $3)
ON CONFLICT (user_id, guild_id)
DO UPDATE SET sapphire = gems.sapphire + EXCLUDED.sapphire
RETURNING user_id, guild_id, sapphire;

-- name: UpsertAmethyst :one
INSERT INTO gems (user_id, guild_id, amethyst)
VALUES ($1, $2, $3)
ON CONFLICT (user_id, guild_id)
DO UPDATE SET amethyst = gems.amethyst + EXCLUDED.amethyst
RETURNING user_id, guild_id, amethyst;

-- name: UpsertKunzite :one
INSERT INTO gems (user_id, guild_id, kunzite)
VALUES ($1, $2, $3)
ON CONFLICT (user_id, guild_id)
DO UPDATE SET kunzite = gems.kunzite + EXCLUDED.kunzite
RETURNING user_id, guild_id, kunzite;

-- name: UpsertRuby :one
INSERT INTO gems (user_id, guild_id, ruby)
VALUES ($1, $2, $3)
ON CONFLICT (user_id, guild_id)
DO UPDATE SET ruby = gems.ruby + EXCLUDED.ruby
RETURNING user_id, guild_id, ruby;

-- name: UpsertGarnet :one
INSERT INTO gems (user_id, guild_id, garnet)
VALUES ($1, $2, $3)
ON CONFLICT (user_id, guild_id)
DO UPDATE SET garnet = gems.garnet + EXCLUDED.garnet
RETURNING user_id, guild_id, garnet;

-- name: UpsertPainite :one
INSERT INTO gems (user_id, guild_id, painite)
VALUES ($1, $2, $3)
ON CONFLICT (user_id, guild_id)
DO UPDATE SET painite = gems.painite + EXCLUDED.painite
RETURNING user_id, guild_id, painite;
