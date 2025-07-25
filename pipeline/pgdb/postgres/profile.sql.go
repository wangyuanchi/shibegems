// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.29.0
// source: profile.sql

package postgres

import (
	"context"
)

const createProfile = `-- name: CreateProfile :exec
INSERT INTO profile (user_id, guild_id)
VALUES ($1, $2)
ON CONFLICT (user_id, guild_id) DO NOTHING
`

type CreateProfileParams struct {
	UserID  int64
	GuildID int64
}

func (q *Queries) CreateProfile(ctx context.Context, arg CreateProfileParams) error {
	_, err := q.db.Exec(ctx, createProfile, arg.UserID, arg.GuildID)
	return err
}

const getMultipliers = `-- name: GetMultipliers :one
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
WHERE user_id = $1 AND guild_id = $2
`

type GetMultipliersParams struct {
	UserID  int64
	GuildID int64
}

type GetMultipliersRow struct {
	DiamondMultiplier    float64
	SunstoneMultiplier   float64
	CitrineMultiplier    float64
	TopazMultiplier      float64
	PeridotMultiplier    float64
	JadeMultiplier       float64
	AquamarineMultiplier float64
	SapphireMultiplier   float64
	AmethystMultiplier   float64
	KunziteMultiplier    float64
	RubyMultiplier       float64
	GarnetMultiplier     float64
	PainiteMultiplier    float64
}

func (q *Queries) GetMultipliers(ctx context.Context, arg GetMultipliersParams) (GetMultipliersRow, error) {
	row := q.db.QueryRow(ctx, getMultipliers, arg.UserID, arg.GuildID)
	var i GetMultipliersRow
	err := row.Scan(
		&i.DiamondMultiplier,
		&i.SunstoneMultiplier,
		&i.CitrineMultiplier,
		&i.TopazMultiplier,
		&i.PeridotMultiplier,
		&i.JadeMultiplier,
		&i.AquamarineMultiplier,
		&i.SapphireMultiplier,
		&i.AmethystMultiplier,
		&i.KunziteMultiplier,
		&i.RubyMultiplier,
		&i.GarnetMultiplier,
		&i.PainiteMultiplier,
	)
	return i, err
}

const updateNetworth = `-- name: UpdateNetworth :one
UPDATE profile
SET networth = networth + $3
WHERE user_id = $1 AND guild_id = $2
RETURNING user_id, guild_id, networth
`

type UpdateNetworthParams struct {
	UserID   int64
	GuildID  int64
	Networth int64
}

type UpdateNetworthRow struct {
	UserID   int64
	GuildID  int64
	Networth int64
}

func (q *Queries) UpdateNetworth(ctx context.Context, arg UpdateNetworthParams) (UpdateNetworthRow, error) {
	row := q.db.QueryRow(ctx, updateNetworth, arg.UserID, arg.GuildID, arg.Networth)
	var i UpdateNetworthRow
	err := row.Scan(&i.UserID, &i.GuildID, &i.Networth)
	return i, err
}
