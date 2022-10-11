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
      render 'api/users/show'

    else
      is_found = User.find_by(email: params[:email])
      if is_found
        render json: { errors: ['The password you entered is incorrect.', 'password']}, 
        status: :unauthorized
      else
        render json: { errors: ['The email you entered is incorrect.', 'email'] }, 
          status: :unauthorized
      end
    end
  end

  def destroy
    logout!
    render json: { message: 'success' }
    # head :no_content 
    # response wont have a body
  end
end
