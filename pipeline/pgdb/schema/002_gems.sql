-- +goose Up

CREATE TABLE gems (
    user_id BIGINT NOT NULL,
    guild_id BIGINT NOT NULL,
    diamond INTEGER NOT NULL DEFAULT 0,
    sunstone INTEGER NOT NULL DEFAULT 0,
    citrine INTEGER NOT NULL DEFAULT 0,
    topaz INTEGER NOT NULL DEFAULT 0,
    peridot INTEGER NOT NULL DEFAULT 0,
    jade INTEGER NOT NULL DEFAULT 0,
    aquamarine INTEGER NOT NULL DEFAULT 0,
    sapphire INTEGER NOT NULL DEFAULT 0,
    amethyst INTEGER NOT NULL DEFAULT 0,
    kunzite INTEGER NOT NULL DEFAULT 0,
    ruby INTEGER NOT NULL DEFAULT 0,
    garnet INTEGER NOT NULL DEFAULT 0,
    painite INTEGER NOT NULL DEFAULT 0,
    PRIMARY KEY (user_id, guild_id),
    FOREIGN KEY (user_id, guild_id) REFERENCES profile(user_id, guild_id) ON DELETE CASCADE
);

-- +goose Down

DROP TABLE gems;