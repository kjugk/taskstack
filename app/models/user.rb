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

class User < ApplicationRecord
  has_many :tasklists, dependent: :destroy
  serialize :tasklist_id_list, Array

  def unshift_tasklist_id!(tasklist_id)
    update!(tasklist_id_list: tasklist_id_list.unshift(tasklist_id))
  end

  def delete_tasklist_id!(tasklist_id)
    tasklist_id_list.delete(tasklist_id)
    save!
  end
end
