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

require 'rails_helper'

RSpec.describe User, type: :model do
  # pending "add some examples to (or delete) #{__FILE__}"
end
