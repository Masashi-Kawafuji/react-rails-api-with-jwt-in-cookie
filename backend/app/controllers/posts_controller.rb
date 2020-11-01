class PostsController < ApplicationController
  def index
    posts = current_user.posts
    render json: posts, status: :ok
  end

  def create
    post = current_user.posts.new(post_params)
    if post.save
      render json: post, status: :created
    else
      render json: post.errors, status: :unprocessable_entity
    end
  end

  def update
  end

  def destroy
  end


  private

  def post_params
    params.require(:post).permit(:body)
  end
end