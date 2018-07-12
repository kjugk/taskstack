class Api::TasksController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    tasklist = Tasklist.find(params[:tasklist_id])

    render json: {
      tasks: tasklist.tasks.map {|task| {id: task.id, title: task.title, memo: task.memo}}
    }
  end

  def create
    tasklist = Tasklist.find(params[:tasklist_id])
    task = Task.new(task_params) 
    if tasklist.tasks << task
      render json: {task: {id: task.id, title: task.title, memo: task.memo}}
    else
    end
  end

  private

  def task_params
    require(:task).permit(:title, :memo)
  end
end
