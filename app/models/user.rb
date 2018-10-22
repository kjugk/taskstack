class User < ApplicationRecord
  has_many :tasklists, dependent: :destroy
  serialize :tasklist_id_list, Array

  def unshift_tasklist_id!(tasklist_id)
    update!(tasklist_id_list: tasklist_id_list.unshift(tasklist_id))
  end

  def delete_tasklist_id!(tasklist_id)
    tasklist_id_list.delete(tasklist_id)
    save!
  end
end
