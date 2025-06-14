-- name: CreateGems :exec
INSERT INTO gems (user_id, guild_id)
VALUES ($1, $2)
ON CONFLICT (user_id, guild_id) DO NOTHING;

-- name: UpdateAllGems :one
UPDATE gems
SET
  diamond = diamond + $3,
  sunstone = sunstone + $4,
  citrine = citrine + $5,
  topaz = topaz + $6,
  peridot = peridot + $7,
  jade = jade + $8,
  aquamarine = aquamarine + $9,
  sapphire = sapphire + $10,
  amethyst = amethyst + $11,
  kunzite = kunzite + $12,
  ruby = ruby + $13,
  garnet = garnet + $14,
  painite = painite + $15
WHERE user_id = $1 AND guild_id = $2
RETURNING *;

-- name: UpdateDiamond :one
UPDATE gems
SET diamond = diamond + $3
WHERE user_id = $1 AND guild_id = $2
RETURNING user_id, guild_id, diamond;

-- name: UpdateSunstone :one
UPDATE gems
SET sunstone = sunstone + $3
WHERE user_id = $1 AND guild_id = $2
RETURNING user_id, guild_id, sunstone;

-- name: UpdateCitrine :one
UPDATE gems
SET citrine = citrine + $3
WHERE user_id = $1 AND guild_id = $2
RETURNING user_id, guild_id, citrine;

-- name: UpdateTopaz :one
UPDATE gems
SET topaz = topaz + $3
WHERE user_id = $1 AND guild_id = $2
RETURNING user_id, guild_id, topaz;

-- name: UpdatePeridot :one
UPDATE gems
SET peridot = peridot + $3
WHERE user_id = $1 AND guild_id = $2
RETURNING user_id, guild_id, peridot;

-- name: UpdateJade :one
UPDATE gems
SET jade = jade + $3
WHERE user_id = $1 AND guild_id = $2
RETURNING user_id, guild_id, jade;

-- name: UpdateAquamarine :one
UPDATE gems
SET aquamarine = aquamarine + $3
WHERE user_id = $1 AND guild_id = $2
RETURNING user_id, guild_id, aquamarine;

-- name: UpdateSapphire :one
UPDATE gems
SET sapphire = sapphire + $3
WHERE user_id = $1 AND guild_id = $2
RETURNING user_id, guild_id, sapphire;

-- name: UpdateAmethyst :one
UPDATE gems
SET amethyst = amethyst + $3
WHERE user_id = $1 AND guild_id = $2
RETURNING user_id, guild_id, amethyst;

-- name: UpdateKunzite :one
UPDATE gems
SET kunzite = kunzite + $3
WHERE user_id = $1 AND guild_id = $2
RETURNING user_id, guild_id, kunzite;

-- name: UpdateRuby :one
UPDATE gems
SET ruby = ruby + $3
WHERE user_id = $1 AND guild_id = $2
RETURNING user_id, guild_id, ruby;

-- name: UpdateGarnet :one
UPDATE gems
SET garnet = garnet + $3
WHERE user_id = $1 AND guild_id = $2
RETURNING user_id, guild_id, garnet;

-- name: UpdatePainite :one
UPDATE gems
SET painite = painite + $3
WHERE user_id = $1 AND guild_id = $2
RETURNING user_id, guild_id, painite;
