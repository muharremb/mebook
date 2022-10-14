class AddBioColumnToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :bio, :text
    add_column :users, :education, :text
    add_column :users, :work, :text
    add_column :users, :hobbies, :text
    add_column :users, :birthday, :string
  end
end
