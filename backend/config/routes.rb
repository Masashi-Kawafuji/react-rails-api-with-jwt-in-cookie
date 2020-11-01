Rails.application.routes.draw do
  post '/login', to: 'auth#login'
  delete '/logout', to: 'auth#logout'
  
  resources :users, only: :create
  resources :posts, except: [:show, :edit]
end