# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  first_name      :string           not null
#  last_name       :string           not null
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  gender          :string
#  bio             :text
#  education       :text
#  work            :text
#  hobbies         :text
#  birthday        :string
#
class User < ApplicationRecord
  has_secure_password
  # validates :first_name, 
  #   length: {in: 2..30}, 
  #   format: { with: /\A[a-zA-Z]+\z/, message: "only allows letters" }
  
    validates :first_name, 
    length: {in: 2..30}
      
  # validates :last_name, 
  #   length: {in: 2..30}, 
  #   format: { with: /\A[a-zA-Z]+\z/, message: "only allows letters" }

  validates :last_name, 
    length: {in: 2..30} 

  validates :email, 
    uniqueness: true, 
    length: { in: 3..255 }, 
    format: { with: URI::MailTo::EMAIL_REGEXP }
  
  validates :session_token, presence: true, uniqueness: true
  validates :password, length: { in: 6..255 }, allow_nil: true

  before_validation :ensure_session_token
  has_many :posts, foreign_key: :author_id, dependent: :destroy, inverse_of: :author
  has_one_attached :photo

  def self.find_by_credentials(email, password)

    user = User.find_by(email: email)
    # user&.authenticate(password)
    if user&.authenticate(password)
      return user
    else
      return nil
    end
  end

  def reset_session_token!
    self.session_token = generate_unique_session_token
    save!
    self.session_token
    # self.update!(session_token: generate_unique_session_token)
    # self.session_token
  end  

  def generate_unique_session_token
    session_token = SecureRandom.base64(16)
    while User.exists?(session_token: session_token)
      session_token = SecureRandom.base64(16)
    end
    return session_token
  end

  def ensure_session_token
    self.session_token ||= generate_unique_session_token
  end

end
