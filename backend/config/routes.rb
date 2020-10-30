Rails.application.routes.draw do
  get '/login', to: 'auth#login'
  
  resources :users, only: :create
end
