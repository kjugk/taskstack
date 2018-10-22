# == Schema Information
#
# Table name: users
#
#  id               :integer          not null, primary key
#  name             :string
#  google_uid       :string
#  image_url        :string
#  new_user         :boolean          default(TRUE)
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  tasklist_id_list :text
#

FactoryBot.define do
  factory :user do
    name {'test'}
    google_uid {''}
    image_url {''}
  end
end
