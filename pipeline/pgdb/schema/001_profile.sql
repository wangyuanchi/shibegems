-- +goose Up

CREATE TABLE profile (
    user_id BIGINT NOT NULL,
    guild_id BIGINT NOT NULL,
    networth INTEGER NOT NULL DEFAULT 0,
    diamond_multiplier DOUBLE PRECISION NOT NULL DEFAULT 1.000,
    sunstone_multiplier DOUBLE PRECISION NOT NULL DEFAULT 1.000,
    citrine_multiplier DOUBLE PRECISION NOT NULL DEFAULT 1.000,
    topaz_multiplier DOUBLE PRECISION NOT NULL DEFAULT 1.000,
    peridot_multiplier DOUBLE PRECISION NOT NULL DEFAULT 1.000,
    jade_multiplier DOUBLE PRECISION NOT NULL DEFAULT 1.000,
    aquamarine_multiplier DOUBLE PRECISION NOT NULL DEFAULT 1.000,
    sapphire_multiplier DOUBLE PRECISION NOT NULL DEFAULT 1.000,
    amethyst_multiplier DOUBLE PRECISION NOT NULL DEFAULT 1.000,
    kunzite_multiplier DOUBLE PRECISION NOT NULL DEFAULT 1.000,
    ruby_multiplier DOUBLE PRECISION NOT NULL DEFAULT 1.000,
    garnet_multiplier DOUBLE PRECISION NOT NULL DEFAULT 1.000,
    painite_multiplier DOUBLE PRECISION NOT NULL DEFAULT 1.000,
    PRIMARY KEY (user_id, guild_id)
);

-- +goose Down

DROP TABLE profile;