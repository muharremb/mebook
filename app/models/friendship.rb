class Friendship < ApplicationRecord
  validates :request_sender, :request_receiver, presence: true
  validates :confirmed, inclusion: {in: [true, false]}

  belongs_to :request_sender,
    class_name: :User

  belongs_to :request_receiver,
    class_name: :User

  def self.find_request(user_1, user_2)
    return Friendship.find_by(
      request_sender_id: user_1,
      request_receiver_id: user_2
    ) || Friendship.find_by(
      request_sender_id: user_2,
      request_receiver_id: user_1
    )
  end
  
  def self.confirmed?(user_1, user_2)
    return !Friendship.where(
      request_sender_id: user_1,
      request_receiver_id: user_2,
      confirmed: true).empty? || 
      !Friendship.where(
        request_sender_id: user_2,
        request_receiver_id: user_1,
        confirmed: true).empty?
  end
end
