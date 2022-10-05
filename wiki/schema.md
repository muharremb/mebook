# Postgres Database Schema

## `users`

| column name       | data type | details                   |
| :---------------- | :-------: | :------------------------ |
| `id`              |  integer  | not null, primary key     |
| `first_name`      |  string   | not null                  |
| `last_name`       |  string   | not null                  |
| `email`           |  string   | not null, indexed, unique |
| `password_digest` |  string   | not null                  |
| `session_token`   |  string   | not null, indexed, unique |
| `created_at`      | datetime  | not null                  |
| `updated_at`      | datetime  | not null                  |

- index on `email, unique: true`
- index on `session_token, unique: true`
- `has_many friends, posts, comments`

## `posts`

| column name  | data type | details                        |
| :----------- | :-------: | :----------------------------- |
| `id`         |  integer  | not null, primary key          |
| `body`       |  string   | not null                       |
| `author_id`  |  integer  | not null, indexed, foreign key |
| `created_at` | datetime  | not null                       |
| `updated_at` | datetime  | not null                       |

- `author_id` references `users`
- index on `author_id`
- `belongs_to user`

## `comments`

| column name  | data type | details                        |
| :----------- | :-------: | :----------------------------- |
| `id`         |  integer  | not null, primary key          |
| `body`       |  string   | not null                       |
| `author_id`  |  integer  | not null, indexed, foreign key |
| `post_id`    |  integer  | not null, indexed, foreign key |
| `created_at` | datetime  | not null                       |
| `updated_at` | datetime  | not null                       |

- `author_id` references `users`
- `post_id` references `posts`
- index on `author_id`
- index on `post_id`
- `belongs_to user`
- `belongs_to post`
