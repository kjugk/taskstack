Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get "/auth/google_oauth2/callback", to: "sessions#create"
  get "/login", to: redirect("/auth/google_oauth2")

  # 直接指定でアクセスされた時のフォールバック
  get '/', to: 'dashboard#show'
  get '/tasklists', to: 'dashboard#show'
  get '/tasklists/:tasklist_id', to: 'dashboard#show'
  get '/tasklists/:tasklist_id/tasks/:task_id', to: 'dashboard#show'

  namespace :api do
    get '/users/verify', to: "users#verify"

    resources :tasklists, only: [:index, :create, :update, :destroy] do
      resources :tasks, only: [:index, :create]
      delete :completed_tasks, to: 'tasklists#destory_completed_tasks'
    end

    resources :tasks, only: [:update, :destroy]
  end
end
