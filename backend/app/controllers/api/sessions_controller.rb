class Api::SessionsController < ApplicationController
  before_action :require_logged_in, only: [:destroy]
  before_action :require_logged_out, only: [:create]
  
  def show
    
    @user = current_user
    if @user 
      render '/api/users/show'
      # render json: {user: current_user}
    else
      render json: {user: nil}
    end
  end

  def create
    @user = User.find_by_credentials(
      params[:email],
      params[:password]
    )
    if @user 
      login!(@user)
      # render json: {user: @user}
      render 'api/session/show'

    else
      # is_found = User.find_by(email: params[:email])
      # if is_found
      #   render json: { errors: ['', 'password']}, 
      #   status: :unauthorized
      # else
      #   render json: { errors: ['', 'email'] }, 
      #     status: :unauthorized
      # end
      render json: { errors: ['The provided credentials were invalid.'] }, 
        status: :unauthorized
    end
  end

  def destroy
    logout!
    render json: { message: 'success' }
    # head :no_content 
    # response wont have a body
  end
end
