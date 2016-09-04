class ListsController < ApplicationController


  def index
     @lists = List.all

     respond_to do |format|
         format.html
         format.json {render json: @lists}
      end
   end



   def show
    @list = list.find_by(id: params[:id])
    @todos = Todos.all
  end



   def create
     @list = List.new(title: params[:list][:title])
     if @list.save
      #  redirect_to new_list_path
        render json: @list
                # something like this ? render json: @list
     end
   end


  #  def edit
  #    @list = List.find_by(id: params[:id])
  #  end

    # def update
    #   @list = List.find_by(id: params[:id])
    #   @list.update(list_params)
    #   # redirect_to_list_path(@list)
    # end


   def destroy

     @list = List.find(params[:id])
     @list.destroy
             render json: @list
   end
end
