class Tasklist < ApplicationRecord
  has_many :tasks, dependent: :destroy

  def active_task_count
    tasks.where(completed: false).count
  end
end
