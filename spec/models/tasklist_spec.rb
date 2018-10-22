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

require 'rails_helper'

RSpec.describe Tasklist, type: :model do
  describe '#title' do
    let(:tasklist) { build(:tasklist) }

    it 'should not be blank' do
      tasklist.title = ''
      expect(tasklist).not_to be_valid
    end

    it 'should be valid length' do
      tasklist.title = 'a' * Tasklist::MAXIMUM_TITLE_LENGTH
      expect(tasklist).to be_valid

      tasklist.title = 'a' * (Tasklist::MAXIMUM_TITLE_LENGTH + 1)
      expect(tasklist).not_to be_valid
    end
  end

  describe '#unshift_task_id!' do
    let(:params) {{task_id_list: [1]}}
    let(:tasklist) { build(:tasklist, params)}

    it 'update task_id_list field' do
      tasklist.unshift_task_id!(2)
      expect(tasklist.task_id_list).to eq([2, 1])
    end
  end

  describe '#delete_task_id!' do
    let(:params) {{task_id_list: [1]}}
    let(:tasklist) { build(:tasklist, params)}

    it 'update task_id_list field' do
      tasklist.delete_task_id!(1)
      expect(tasklist.task_id_list).to eq([])
    end
  end
end
