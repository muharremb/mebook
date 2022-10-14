class Api::PostsController < ApplicationController
  def index
    @posts = Post.all
    @posts = @posts.where(author_id: author_id_search) if author_id_search

    if @posts 
      render 'api/posts/index'
    else
      render json: {errors: @post.errors.full_messages}, status: :unprocessable_entity
  end

  def create
    @post = Post.new(post_params)

    if @post.save
      render :show
      # render json: {post: @post}
    else
      render json: {errors: @post.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def show
    @post = Post.find(params[:id])

    # render json: {post: @post}
    if @post 
      render 'api/posts/show'
      # render json: {post: @post}
    else
      render json: {errors: @post.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def update
    @post = Post.find(params[:id])
  end

  def destroy
  end

  def post_params
    params.require(:post).permit(:body, :author_id)
  end

  def author_id_search
    return nil unless params[:author_id]
    params[:author_id]
  end

end