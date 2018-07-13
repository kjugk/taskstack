class Tasklist < ApplicationRecord
  has_many :tasks, dependent: :destroy
end
