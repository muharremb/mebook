class CreateFriendships < ActiveRecord::Migration[7.0]
  def change
    create_table :friendships do |t|
      t.references :request_sender, null: false, foreign_key: {to_table: :users}
      t.references :request_receiver, null: false, foreign_key: {to_table: :users}
      t.boolean :confirmed, null:false, default: false

      t.timestamps
    end
  end
end
