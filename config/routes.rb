Rails.application.routes.draw do
  resources :game_sessions
  resources :puzzle_settings
  resources :words
  resources :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
