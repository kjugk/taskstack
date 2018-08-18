class Api::TasksController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    tasklist = Tasklist.find(params[:tasklist_id])
    @tasks = tasklist.tasks
  end

  def create
    @tasklist = Tasklist.find(params[:tasklist_id])
    @task = Task.new(task_params.merge(user: current_user)) 

    @tasklist.transaction do 
      @task.tasklist = @tasklist
      @task.save!
      @tasklist.unshift_task_id(@task.id)
      render 'api/tasks/show'
    end
  end

  def update
    @task = Task.find(params[:id])
    @tasklist = @task.tasklist

    if @task.update(task_params)
      render 'api/tasks/show'
    else
    end
  end

  def destroy
    @task = Task.find(params[:id])
    @tasklist = @task.tasklist

    @tasklist.transaction do
      @task.destroy!
      @tasklist.delete_task_id(@task.id)
      render 'api/tasks/show'
    end
  end

  private

  def task_params
    params.require(:task).permit(:title, :memo, :completed)
  end
end
