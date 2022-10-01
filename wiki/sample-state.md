```js
    {
        entities: {
            users: {
                1: {
                    id: 1,
                    firstName: 'Xxx',
                    lastName: 'Yyy'
                }
            },
            posts: {
                1: {
                    id: 1,
                    body: "abcdefg abcdefg abcdefg",
                    authorId: 1
                }
            },
            comments: {
                1: {
                    id: 1,
                    body: "asdf asdf asdf",
                    authorId: 1,
                    postId: 1
                }
            }
        },
        ui: {},
        errors: {
            login: ["Invalid username/password combination"],
            postForm: ["Body cant be blank"]
        },
        session: {currentUserId: 1}
    }
```