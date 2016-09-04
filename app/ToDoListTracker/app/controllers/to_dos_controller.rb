class ToDosController < ApplicationController


  def index
   @todos = List.find(params[:list_id]).todos
   render json: @todos
 end

 def create
   @todo = Todo.new(todo_params)
   if @todo.save
     #redirect_to
     render json: @todo
   end
 end

 def destroy
   @todo = Todo.find(params[:id])
   @todo.destroy
   #redirect_to
   render json: @todo
 end

 private
 def todo_params
   params.require(:todo).permit(:description, :priority, :list_id)
 end


end
