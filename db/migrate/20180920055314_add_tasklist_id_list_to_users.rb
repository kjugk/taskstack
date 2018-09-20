class AddTasklistIdListToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :tasklist_id_list, :text
  end
end
