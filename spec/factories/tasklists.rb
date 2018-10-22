# == Schema Information
#
# Table name: tasklists
#
#  id           :integer          not null, primary key
#  title        :string
#  task_id_list :text
#  user_id      :integer
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

FactoryBot.define do
  factory :tasklist do
    title {'title'}
    user
  end
end
