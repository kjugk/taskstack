require 'test_helper'

class TasklistTest < ActiveSupport::TestCase
  def setup
    @tasklist = Tasklist.new(title: "idkei", user: users(:one))
  end

  test 'valid tasklist' do
    assert @tasklist.valid?
  end

  test 'invalid without title' do
    @tasklist.title = ''
    assert @tasklist.invalid?
  end

  test 'invalid title length is over limit' do
    @tasklist.title = 'a' * Tasklist::MAX_TITLE_LENGTH
    assert @tasklist.valid?

    @tasklist.title = 'a' * (Tasklist::MAX_TITLE_LENGTH + 1)
    assert @tasklist.invalid?
  end
end
