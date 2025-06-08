-- name: CreateUser :one
INSERT INTO gems (user_id, guild_id, diamond, sunstone, citrine, topaz, peridot, jade, aquamarine, sapphire, amethyst, kunzite, ruby, garnet, painite)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
RETURNING *;