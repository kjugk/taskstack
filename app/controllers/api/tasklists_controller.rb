class Api::TasklistsController < ApplicationController
  def index
    @tasklists = Tasklist.all
  end

  def create
    @tasklist = Tasklist.new(tasklist_params)

    if @tasklist.save
      head: :created
    else
      # TODO
      # 共通のエラーフォーマットで、エラーメッセージを送信する
    end
  end

  private

  def tasklist_params
    params.require(:tasklist).permit(:title)
  end
end
