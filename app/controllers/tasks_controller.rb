class TasksController < ApplicationController

  def index
    binding.pry
  end

  def create
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
