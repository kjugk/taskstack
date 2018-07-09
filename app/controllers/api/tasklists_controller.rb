class Api::TasklistsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @tasklists = Tasklist.order("created_at DESC").all
  end

  def create
    @tasklist = Tasklist.new(tasklist_params)

    if @tasklist.save
      render json: { tasklist: { id: @tasklist.id, title: @tasklist.title }}, status: :created
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
