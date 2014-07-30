class TasksController < ApplicationController

  def index
    @tasks = List.find(params[:list_id]).tasks
    render json: @tasks
  end

  def create
    binding.pry
    @task = Task.new(task_params)
    if @task.save
      render json: @task
    end
  end

  private
  def task_params
    params.require(:task).permit(:description, :priority, :list_id)
  end
end
