class CreateTasklists < ActiveRecord::Migration[5.2]
  def change
    create_table :tasklists do |t|
      t.string :title
      t.text :task_id_list
      t.integer :user_id
      t.timestamps
    end

    add_index :tasklists, :user_id
  end
end
