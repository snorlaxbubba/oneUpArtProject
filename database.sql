DROP TABLE IF EXISTS user_posts;
DROP TABLE IF EXISTS image_posts;
DROP TABLE IF EXISTS images;
DROP TABLE IF EXISTS post_tags;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS tags;

CREATE TABLE posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    kudos INT NOT NULL DEFAULT 0
);

CREATE TABLE user_posts (
    user_id UUID NOT NULL,
    username TEXT NOT NULL,
    post_id UUID NOT NULL,
    PRIMARY KEY (user_id, post_id),
    FOREIGN KEY (post_id) REFERENCES posts(id)
);

CREATE TABLE tags (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE
);

CREATE TABLE post_tags (
    post_id UUID NOT NULL,
    tag_id UUID NOT NULL,
    PRIMARY KEY (post_id, tag_id),
    FOREIGN KEY (post_id) REFERENCES posts(id),
    FOREIGN KEY (tag_id) REFERENCES tags(id)
);

CREATE TABLE images (
    id UUID DEFAULT gen_random_uuid(),
    image_url BYTEA NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE image_posts (
    image_id UUID NOT NULL,
    post_id UUID NOT NULL,
    PRIMARY KEY (image_id, post_id),
    FOREIGN KEY (image_id) REFERENCES images(id),
    FOREIGN KEY (post_id) REFERENCES posts(id)
);
