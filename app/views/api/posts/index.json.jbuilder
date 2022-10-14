json.posts({})

json.posts do 
    @posts.each do |post|
        json.set! post.id do
            json.partial! '/api/posts/post', post: post
        end
    end
end