class Api::TasklistsController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :verify_jwt_token

  def index
    @tasklists = current_user.tasklists.order("created_at DESC")
  end

  def create
    @tasklist = Tasklist.new(tasklist_params)
    @tasklist.user = current_user

    @tasklist.transaction do
      if @tasklist.save
        current_user.unshift_tasklist_id(@tasklist.id)
        render 'api/tasklists/show', status: :created
      else
        # TODO
        # 共通のエラーフォーマットで、エラーメッセージを送信する
      end
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

    @tasklist.transaction do
      if @tasklist.destroy
        current_user.delete_tasklist_id(@tasklist.id)
        head :ok
      else
        # TODO
        # 共通のエラーフォーマットで、エラーメッセージを送信する
      end
    end
  end

  private

  def tasklist_params
    params.require(:tasklist).permit(:title, task_id_list: [])
  end
end
