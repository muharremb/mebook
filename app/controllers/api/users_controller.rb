class Api::UsersController < ApplicationController
  
  wrap_parameters include: User.attribute_names + ['password'] + ['photo'] + ['friending'] + ['accepting'] + ["cancelling"] + ["removing"]
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
    @user = User.includes(:sent_requests, :received_requests).find(params[:id])
    
    @friends = @user.sent_requests.select {|ele| ele.confirmed }.concat(@user.received_requests.select {|ele| ele.confirmed})
    @pendings = @user.received_requests.select {|ele| !ele.confirmed}.concat(@user.sent_requests.select {|ele| !ele.confirmed})
    
    render 'api/users/getUser'
  end

  def update
    # @user = current_user
    # TODO not sure update has @user
    @user = User.includes(:sent_requests, :received_requests).find(current_user.id)
    
    if params.has_key?(:photo)
      @user.photo.attach(params[:photo])
    
    elsif params.has_key?(:friending)
      friendship = Friendship.find_by(request_receiver_id: user_params[:friending], request_sender_id: @user.id)
      if !friendship
        created_friendship = Friendship.new(
          request_sender_id: @user.id,
          request_receiver_id: user_params["friending"]
        )      
        created_friendship.save
        @friends = @user.sent_requests.select {|ele| ele.confirmed }.concat(@user.received_requests.select {|ele| ele.confirmed})
        @pendings = @user.received_requests.select {|ele| !ele.confirmed}.concat(@user.sent_requests.select {|ele| !ele.confirmed})
        render 'api/users/getUser'
      end
    
    elsif params.has_key?(:accepting)
      requested_friendship = Friendship.find_by(request_sender_id: user_params[:accepting], request_receiver_id: @user.id)
      if requested_friendship
        requested_friendship.update(confirmed: true)
        @friends = @user.sent_requests.select {|ele| ele.confirmed }.concat(@user.received_requests.select {|ele| ele.confirmed})
        @pendings = @user.received_requests.select {|ele| !ele.confirmed}.concat(@user.sent_requests.select {|ele| !ele.confirmed})
        render 'api/users/getUser'
      end
    elsif params.has_key?(:cancelling)
      cancelled_friendship = Friendship.find_by(
        request_sender_id: @user.id,
        request_receiver_id: user_params[:cancelling]
      )
      if cancelled_friendship
        cancelled_friendship.destroy
        @friends = @user.sent_requests.select {|ele| ele.confirmed }.concat(@user.received_requests.select {|ele| ele.confirmed})
        @pendings = @user.received_requests.select {|ele| !ele.confirmed}.concat(@user.sent_requests.select {|ele| !ele.confirmed})
        render 'api/users/getUser'
      end
    elsif params.has_key?(:removing)
      removed_friendship = Friendship.find_request(
        @user.id, user_params[:removing] 
      )
      if removed_friendship
        removed_friendship.destroy
        @friends = @user.sent_requests.select {|ele| ele.confirmed }.concat(@user.received_requests.select {|ele| ele.confirmed})
        @pendings = @user.received_requests.select {|ele| !ele.confirmed}.concat(@user.sent_requests.select {|ele| !ele.confirmed})
        render 'api/users/getUser'
      end
    else
      if @user.update(user_params)
        @friends = @user.sent_requests.select {|ele| ele.confirmed }.concat(@user.received_requests.select {|ele| ele.confirmed})
        @pendings = @user.received_requests.select {|ele| !ele.confirmed}.concat(@user.sent_requests.select {|ele| !ele.confirmed})
        render 'api/users/getUser'
      else
        render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
      end
    end
  end
  
  private

  def user_params
    params.require(:user).permit(:first_name, :last_name, :email, :password, :gender, :bio, :education, :work, :hobbies, :birthday, :photo, :friending, :accepting, :cancelling, :removing)
  end
end
