class Api::TasksController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    tasklist = Tasklist.find(params[:tasklist_id])

    render json: {
      tasks: tasklist.tasks.map {|task| {id: task.id, title: task.title, memo: task.memo, completed: task.completed}}
    }
  end

  def create
    tasklist = Tasklist.find(params[:tasklist_id])
    task = Task.new(task_params) 

    if tasklist.tasks << task
      render json: {task: {id: task.id, title: task.title, memo: task.memo, completed: task.completed}}
    else
    end
  end

  def update
    task = Task.find(params[:id])

    if task.update(task_params)
      render json: {task: {id: task.id, title: task.title, memo: task.memo, completed: task.completed}}
    else
    end
  end

  private

  def task_params
    params.require(:task).permit(:title, :memo, :completed)
  end
end
