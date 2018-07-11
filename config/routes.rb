Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get '/', to: 'dashboard#show'

  namespace :api do
    resources :tasklists, only: [:index, :create, :update, :destroy]
  end
end
