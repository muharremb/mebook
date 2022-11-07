class Api::UsersController < ApplicationController
  
  wrap_parameters include: User.attribute_names + ['password'] + ['photo'] + ['friending']
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

  def show 
    # @user = User.find(params[:id])
    @user = User.includes(:sent_requests, :received_requests).find(params[:id])
    
    @friends = @user.sent_requests.select {|ele| ele.confirmed }.concat(@user.received_requests.select {|ele| ele.confirmed})
    @pendings = @user.received_requests.select {|ele| !ele.confirmed}.concat(@user.sent_requests.select {|ele| !ele.confirmed})
    # render json: {user: @user}
    render 'api/users/getUser'
  end

  def update
    @user = current_user
    
    if params.has_key?(:photo)
      @user.photo.attach(params[:photo])
    
    elsif params.has_key?(:friending)
      # sender, receive
      friendship = Friendship.new(
        request_sender_id: @user.id,
        request_receiver_id: user_params["friending"]
      )
      # need to check for error
      friendship.save
      @friends = @user.sent_requests.select {|ele| ele.confirmed }.concat(@user.received_requests.select {|ele| ele.confirmed})
      @pendings = @user.received_requests.select {|ele| !ele.confirmed}.concat(@user.sent_requests.select {|ele| !ele.confirmed})
      render 'api/users/getUser'

    else
      if @user.update(user_params)
        render 'api/users/getUser'
      else
        render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
      end
    end
  end
  
  private

  def user_params
    params.require(:user).permit(:first_name, :last_name, :email, :password, :gender, :bio, :education, :work, :hobbies, :birthday, :photo, :friending)
  end
end
