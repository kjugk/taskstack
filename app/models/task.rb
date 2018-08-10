class Task < ApplicationRecord
  belongs_to :tasklist
  belongs_to :user
end
