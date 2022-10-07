# Backend Routes

## API Endpoints
```users```
   - ```GET /api/users``` - returns the user information
   - ```POST /api/users``` - sign up

```session```
   - ```POST /api/session``` - log in
   - ```DELETE /api/session``` - log out

```posts```
   - ```GET /api/posts``` - returns the relevant posts (filtered by data/params)
   - ```GET /api/posts/:id``` - returns a post
   - ```POST /api/posts``` - creates a post
   - ```PATCH /api/posts/:id``` - edits a post
   - ```DELETE /api/posts/:id``` - removes a post

```comments```
   - ```POST /api/comments``` - creates a post
   - ```PATCH /api/comments/:id``` - updates a post
   - ```DELETE /api/comments/:id``` - deletes a post

   NOTE: comments does not include a ```GET``` route because we can fetch a comment through users/posts association relation. 