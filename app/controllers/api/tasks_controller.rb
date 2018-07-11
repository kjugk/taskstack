class Api::TasksController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    tasklist = Tasklist.find(params[:tasklist_id])

    render json: {
      tasks: tasklist.tasks.map {|task| {title: task.title, memo: task.memo}}
    }
  end
end
