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
    @list = List.find(params[:id])
    @list.destroy
    # The controller needs to render something
    # for the response so that the AJAX doesnt break
    render json: {}
  end
end