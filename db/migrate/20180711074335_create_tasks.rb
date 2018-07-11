class CreateTasks < ActiveRecord::Migration[5.2]
  def change
    create_table :tasks do |t|
      t.string :title
      t.text :memo
      t.integer :tasklist_id

      t.timestamps
    end

    add_index :tasks, :tasklist_id
  end
end
