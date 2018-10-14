class Task < ApplicationRecord
  belongs_to :tasklist
  belongs_to :user

  scope :active, -> { where(completed: false) }
end
