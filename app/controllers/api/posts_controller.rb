class Api::PostsController < ApplicationController
  def index
    @posts = Post.all
    @posts = @posts.where(author_id: author_id_search) if author_id_search

    if @posts 
      render 'api/posts/index'
    else
      render json: {errors: @post.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def create
    @post = current_user.posts.new(post_params)

    if @post.save
      render :show
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
    @post = current_user.posts.find(params[:id])
    unless @post
      render json: {message: 'Unauthorized' }, status: unauthorized
      return
    end
    @post.destroy
    render :show
  end

  def post_params
    params.require(:post).permit(:body, :author_id)
  end

  def author_id_search
    return nil unless params[:author_id]
    params[:author_id]
  end

end
