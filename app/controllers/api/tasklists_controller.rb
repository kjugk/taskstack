class Api::TasklistsController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :verify_jwt_token

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
    authorize! :manage, @tasklist

    if @tasklist.update(tasklist_params)
      render 'api/tasklists/show', status: :ok
    else
      # TODO
      # 共通のエラーフォーマットで、エラーメッセージを送信する
    end
  end

  def destroy
    @tasklist = Tasklist.find(params[:id])
    authorize! :manage, @tasklist

    if @tasklist.destroy
      head :ok
    else
      # TODO
      # 共通のエラーフォーマットで、エラーメッセージを送信する
    end
  end

  def destory_completed_tasks
    @tasklist = Tasklist.find(params[:tasklist_id])
    authorize! :manage, @tasklist

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
