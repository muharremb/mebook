json.user do
    json.extract! @user, :id, :first_name, :last_name, :email, :gender, :bio, :education, :work, :hobbies, :birthday
    json.photo @user.photo.url
    json.cover_image @user.cover_image.url
end