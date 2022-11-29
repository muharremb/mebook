# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
# require 'open-uri'

ApplicationRecord.transaction do 
    puts "Destroying tables..."
    # Unnecessary if using `rails db:seed:replant`
    User.destroy_all
  
    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')
  
    puts "Creating users..."
    # Create one user with an easy to remember username, email, and password:
    user = User.create!(
      first_name: 'Jerry', 
      last_name: 'Seinfeld', 
      email: 'js@gmail.com', 
      password: 'password'
    )

    # file = URI.open('app/assets/image/istanbul.jpg')
    file = File.open('app/assets/images/istanbul.jpg')
    user.photo.attach(io: file, filename: 'istanbul.jpg')

    # first_name= Faker::Name.unique.first_name
    # user = Faker::Internet.user('first_name', 'last_name')
    # puts user
    # More users

    user.posts.create!(body: 'Hello World')
    user.posts.create!(body: 'Time for change has come')
    user.posts.create!(body: 'The buck stops here')

    # 10.times do 
    #   User.create!({
    #     first_name: Faker::Name.unique.first_name,
    #     last_name: Faker::Name.unique.last_name,
    #     email: Faker::Internet.unique.email,
    #     password: 'password'
    #   }) 
    # end

  
    puts "Users Done!"

    
  end