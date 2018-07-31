class CreateTasklists < ActiveRecord::Migration[5.2]
  def change
    create_table :tasklists do |t|
      t.string :title
      t.text :task_id_list
      t.timestamps
    end
  end
end
