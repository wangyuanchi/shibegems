-- name: CreateProfile :exec
INSERT INTO profile (user_id, guild_id)
VALUES ($1, $2)
ON CONFLICT (user_id, guild_id) DO NOTHING;

-- name: UpdateNetworth :one
UPDATE profile
SET networth = networth + $3
WHERE user_id = $1 AND guild_id = $2
RETURNING user_id, guild_id, networth;

-- name: GetMultipliers :one
SELECT 
  diamond_multiplier,
  sunstone_multiplier,
  citrine_multiplier,
  topaz_multiplier,
  peridot_multiplier,
  jade_multiplier,
  aquamarine_multiplier,
  sapphire_multiplier,
  amethyst_multiplier,
  kunzite_multiplier,
  ruby_multiplier,
  garnet_multiplier,
  painite_multiplier
FROM profile
WHERE user_id = $1 AND guild_id = $2;
