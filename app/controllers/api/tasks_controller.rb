class Api::TasksController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    tasklist = Tasklist.find(params[:tasklist_id])
    @tasks = tasklist.tasks
  end

  def create
    @tasklist = Tasklist.find(params[:tasklist_id])
    @task = Task.new(task_params) 

    if @tasklist.tasks << @task
      render 'api/tasks/show'
    else
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

    if @task.destroy
      render 'api/tasks/show'
    else
    end
  end

  private

  def task_params
    params.require(:task).permit(:title, :memo, :completed)
  end
end
