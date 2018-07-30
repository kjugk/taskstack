class Task < ApplicationRecord
  belongs_to :tasklist, counter_cache: :task_count
end
