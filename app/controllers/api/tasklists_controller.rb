class Api::TasklistsController < ApplicationController
  skip_before_action :verify_authenticity_token
  # TODO: verify token and send error
  # TODO model authorization

  def index
    @tasklists = current_user.tasklists.order("created_at DESC")
  end

  def create
    @tasklist = Tasklist.new(tasklist_params)
    @tasklist.user = current_user

    if @tasklist.save
      render 'api/tasklists/show', status: :created
    else
      # TODO
      # 共通のエラーフォーマットで、エラーメッセージを送信する
    end
  end

  def update
    @tasklist = Tasklist.find(params[:id])

    if @tasklist.update(tasklist_params)
      render 'api/tasklists/show', status: :ok
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

  def destory_completed_tasks
    @tasklist = Tasklist.find(params[:tasklist_id])

    if @tasklist.destroy_completed_tasks
      render 'api/tasklists/show', status: :ok
    else
    end
  end

  private

  def tasklist_params
    params.require(:tasklist).permit(:title, task_id_list: [])
  end
end
