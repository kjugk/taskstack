Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get '/', to: 'dashboard#show'
  get '/auth/google_oauth2/callback', to: 'sessions#create'
  get '/login', to: redirect('/auth/google_oauth2')

  namespace :api do
    get 'users/verify', to: 'users#verify'
    patch 'users/tasklist_sort', to: 'users#sort_tasklist'
    delete 'account', to: 'users#destroy'

    resources :tasklists, only: [:index, :create, :update, :destroy] do
      resources :tasks, only: [:index, :create]
    end

    resources :tasks, only: [:update, :destroy]
  end

  get '*path', to: 'dashboard#show'
end
