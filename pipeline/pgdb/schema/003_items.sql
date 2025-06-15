-- +goose Up

CREATE TABLE items (
    user_id BIGINT NOT NULL,
    guild_id BIGINT NOT NULL,
    item TEXT NOT NULL,
    PRIMARY KEY (user_id, guild_id, item),
    FOREIGN KEY (user_id, guild_id) REFERENCES profile(user_id, guild_id) ON DELETE CASCADE
);

-- +goose Down

DROP TABLE items;