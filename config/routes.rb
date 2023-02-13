Rails.application.routes.draw do

  namespace :api do
    resources :cart_items
    resources :carts
    resources :order_items
    resources :orders
    resources :products
    resources :users
    post "/login", to: "sessions#create"
    delete "/logout", to: "sessions#destroy"
  end
  
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
