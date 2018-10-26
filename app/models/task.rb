# == Schema Information
#
# Table name: tasks
#
#  id          :integer          not null, primary key
#  title       :string
#  memo        :text             default("")
#  tasklist_id :integer
#  completed   :boolean          default(FALSE)
#  user_id     :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Task < ApplicationRecord
  belongs_to :tasklist
  belongs_to :user
  has_many :subtasks

  scope :active, -> { where(completed: false) }
end
