class ListsController < ApplicationController

  def index
    @lists = List.all
    respond_to do |format|
      format.html #render the index.html.erb
      format.json {render json: @lists}
    end
  end

  def create
    # params #=> {list: {title: "some string"}}
    @list = List.new(title: params[:list][:title])
    if @list.save
      render json: @list
    end
  end

  def destroy
    @list = List.find(params[:list][:id])
    @list.destroy
    render json: {}
  end
end



















# def index
#   @lists = List.all
#   respond_to do |format|
#     format.html # index.html.erb
#     format.json { render json: @lists }
#   end
# end

# def create 
#   # ajax post creates new List instance based on js model
#   @list = List.new(title: params["title"])
#   # response of newy saved list instance including id
#   if list.save
#     render json: @list
#   else
#     "error"
#   end 

# end