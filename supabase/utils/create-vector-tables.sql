create table users
(
    id    serial primary key,
    name  text not null,
    email text not null
);

create table users_embeddings
(
    id        serial primary key,
    user_id   integer references users (id) on delete cascade,
    content   text not null,
    embedding vector(768)
);



