Rails.application.routes.draw do

  resources :lists do
    resources :todo
  end

  root 'lists#index'

end 
