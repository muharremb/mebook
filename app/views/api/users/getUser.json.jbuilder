json.user do
    json.extract! @user, :id, :first_name, :last_name, :email, :gender, :bio, :education, :work, :hobbies, :birthday
    json.photo @user.photo.url
    json.cover_image @user.cover_image.url

    friends_id_list = []
    @friends.each do |row|
        if @user.id == row.request_sender_id
            friends_id_list << row.request_receiver_id
        else
            friends_id_list << row.request_sender_id
        end
    end

    # json.friends @friends, :request_sender_id, :request_receiver_id
    json.friends friends_id_list
    
    pending_id_list = []
    @pendings.each do |row|
        if @user.id == row.request_sender_id
            pending_id_list << row.request_receiver_id
        else
            pending_id_list << row.request_sender_id
        end
    end

    json.pendings pending_id_list
    # json.pendings @pendings, :request_sender_id, :request_receiver_id
    # need to add friends as an array here, so that friends: [3]
end