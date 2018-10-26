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
      @tasklist.save!
      current_user.unshift_tasklist_id!(@tasklist.id)
    end

    render 'api/tasklists/show', status: :created

  rescue
    render json: {messages: @tasklist.errors.full_messages}, status: 422
  end

  def update
    @tasklist = Tasklist.find(params[:id])
    authorize! :manage, @tasklist

    if @tasklist.update(tasklist_params)
      render 'api/tasklists/show', status: :ok
    else
      render json: {messages: @tasklist.errors.full_messages}, status: 422
    end
  end

  def destroy
    @tasklist = Tasklist.find(params[:id])
    authorize! :manage, @tasklist

    @tasklist.transaction do
      @tasklist.destroy!
      current_user.delete_tasklist_id!(@tasklist.id)
    end
    
    head :ok

  rescue
    render json: {messages: @tasklist.errors.full_messages}, status: 422
  end

  # tasklist の並び替え
  # 実際は、User#tasklist_id_list を更新する
  def sort
    if current_user.update(tasklist_id_list: params[:tasklist_id_list])
      head :ok
    else
      render json: {messages: ['Sort faild.']}, status: 422
    end
  end

  private

  def tasklist_params
    params.require(:tasklist).permit(:title, task_id_list: [])
  end
end
