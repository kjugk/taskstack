class Tasklist < ApplicationRecord
  belongs_to :user
  has_many :tasks, dependent: :destroy
  serialize :task_id_list, Array

  def unshift_task_id(task_id)
    update!(task_id_list: task_id_list.unshift(task_id))
  end

  def delete_task_id(task_id)
    task_id_list.delete(task_id)
    save!
  end

  def active_task_count
    @active_task_count ||= tasks.where(completed: false).count
  end
end
