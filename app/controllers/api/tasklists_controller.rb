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

  def update
    @tasklist = Tasklist.find(params[:id])

    if @tasklist.update(tasklist_params)
      render json: { tasklist: { id: @tasklist.id, title: @tasklist.title }}, status: :ok
    else
      # TODO
      # 共通のエラーフォーマットで、エラーメッセージを送信する
    end
  end

  def destroy
    @tasklist = Tasklist.find(params[:id])

    if @tasklist.destroy
      head :ok
    else
      # TODO
      # 共通のエラーフォーマットで、エラーメッセージを送信する
    end
  end

  private

  def tasklist_params
    params.require(:tasklist).permit(:title, :task_ids)
  end
end
