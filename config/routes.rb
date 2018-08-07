Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get '/', to: 'dashboard#show'

  namespace :api do
    resources :tasklists, only: [:index, :create, :update, :destroy] do
      resources :tasks, only: [:index, :create]
      delete :completed_tasks, to: 'tasklists#destory_completed_tasks'
    end

    resources :tasks, only: [:update, :destroy]
  end
end
