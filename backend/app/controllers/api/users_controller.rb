class Api::UsersController < ApplicationController
  
  wrap_parameters include: User.attribute_names + ['password']
  before_action :require_logged_out, only: [:create]

  def create
    first_name = user_params["first_name"].capitalize()
    last_name = user_params["last_name"].capitalize()
    email = user_params["email"]
    password = user_params["password"]
    gender = user_params["gender"]

    @user = User.new(
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: password,
      gender: gender
    )

    if @user.save
      login!(@user)
      render :show
      # render json: {user: @user}
      
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def index
    @users = User.all

    # render json: {users: @users}
    render 'api/users/index'

  end

  private

  def user_params
    params.require(:user).permit(:first_name, :last_name, :email, :password, :gender)
  end
end
