# Frontend Routes

- ```/```
   - ```Splash```
- ```/login```
   - ```SessionForm```
- ```/signup```
   - ```SessionForm```
- ```/feed```
   - ```PostIndex```
      - ```PostIndexItem```
- ```/users/:userId```
   - ```ProfileComponent```
   - ```ProfileComponent```
      - ```PostIndexItem```
      - ```AboutItem```
      - ```FriendsItem```
- ```/posts/new```
    - ```PostForm```
- ```/posts/:postId```
    - ```PostShow```
- ```/posts/:postId/edit```
    - ```PostForm```

NOTE: On the users frontend components, we might need to change. I initially planned to use tab version posts/about/friends. 