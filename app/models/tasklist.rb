class Tasklist < ApplicationRecord
  # constants
  MAXIMUM_TITLE_LENGTH = 100

  belongs_to :user
  has_many :tasks, dependent: :destroy
  serialize :task_id_list, Array

  validates :title, presence: true
  validates :title, length: { maximum: MAXIMUM_TITLE_LENGTH }

  def unshift_task_id!(task_id)
    update!(task_id_list: task_id_list.unshift(task_id))
  end

  def delete_task_id!(task_id)
    task_id_list.delete(task_id)
    save!
  end

  def active_task_count
    @active_task_count ||= tasks.active.count
  end
end
