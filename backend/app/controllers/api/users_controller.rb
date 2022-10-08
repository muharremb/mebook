class Api::UsersController < ApplicationController
  
  wrap_parameters include: User.attribute_names + ['password']

  def create
    first_name = user_params["first_name"].capitalize()
    last_name = user_params["last_name"].capitalize()
    email = user_params["email"]
    password = user_params["password"]

    # render json: {first_name: first_name, last_name: last_name}
    # render json: user_params
    @user = User.new(
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: password
    )

    if @user.save
      login!(@user)
      # render :show
      render json: {user: @user}
      
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

private

  def user_params
    params.require(:user).permit(:first_name, :last_name, :email, :password)
  end
end
