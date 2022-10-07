```js
    {
        entities: {
            users: {
                byId: {
                    1: {
                        id: 1,
                        firstName: 'Bill',
                        lastName: 'Clinton',
                        friendsIds: [2, 3]
                    },
                    2: {
                        id: 2,
                        firstName: 'Barack',
                        lastName: 'Obama',
                        friendsIds: [1,3]
                    },
                    3: {
                        id: 3,
                        firstName: 'Harry',
                        lastName: 'Truman',
                        friendsIds: [1,2]
                    }
                },
                allIds: [1, 2, 3]
            },
            posts: {
                byId: {
                    1: {
                        id: 1,
                        body: "I smoked but I didnt inhale",
                        authorId: 1
                    },
                    2: {
                        id: 2,
                        body: "Time for change has come",
                        authorId: 2
                    },
                    3: {
                        id: 3,
                        body: "The buck stops here",
                        authorId: 3
                    },
                },
                allIds: [1,2,3]
            },
            comments: {
                byId: {
                    1: {
                        id: 1,
                        body: "Come on Bill",
                        authorId: 2,
                        postId: 1
                    },
                    2: {
                        id: 2,
                        body: "You are right Truman",
                        authorId: 2,
                        postId: 3
                    },
                },
                allIds: [1,2]
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

NOTE: We might need to change users slice of state, eg friends.