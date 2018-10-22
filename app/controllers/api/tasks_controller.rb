class Api::TasksController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :verify_jwt_token

  def index
    tasklist = Tasklist.find(params[:tasklist_id])
    authorize! :manage, tasklist

    @tasks = tasklist.tasks
  end

  def create
    @tasklist = Tasklist.find(params[:tasklist_id])
    authorize! :manage, @tasklist

    @task = Task.new(task_params)
    @task.user = current_user
    @task.tasklist = @tasklist

    @tasklist.transaction do 
      @task.save!
      @tasklist.unshift_task_id!(@task.id)
    end

    render 'api/tasks/show'

  rescue => e
    render json: {messages: @task.errors.full_messages}, status: 422
  end

  def update
    @task = Task.find(params[:id])
    authorize! :manage, @task

    @tasklist = @task.tasklist
    if @task.update(task_params)
      render 'api/tasks/show'
    else
    end
  end

  def destroy
    @task = Task.find(params[:id])
    authorize! :manage, @task

    @tasklist = @task.tasklist
    @tasklist.transaction do
      @task.destroy!
      @tasklist.delete_task_id!(@task.id)
    end

    render 'api/tasks/show'

  rescue => e
    render json: {messages: @task.errors.full_messages}, status: 422
  end

  private

  def task_params
    params.require(:task).permit(:title, :memo, :completed)
  end
end
