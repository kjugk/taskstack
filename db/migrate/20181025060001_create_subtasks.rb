class CreateSubtasks < ActiveRecord::Migration[5.2]
  def change
    create_table :subtasks do |t|
      t.integer :user_id
      t.integer :task_id
      t.string :title
      t.boolean :completed

      t.timestamps
    end

    add_index :subtasks, :user_id
    add_index :subtasks, :task_id
  end
end
