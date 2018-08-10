class CreateTasks < ActiveRecord::Migration[5.2]
  def change
    create_table :tasks do |t|
      t.string :title
      t.text :memo, default: ''
      t.integer :tasklist_id
      t.boolean :completed, default: false
      t.integer :user_id
      t.timestamps
    end

    add_index :tasks, :tasklist_id
    add_index :tasks, :user_id
  end
end
