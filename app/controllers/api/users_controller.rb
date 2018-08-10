class Api::UsersController < ApplicationController
  skip_before_action :verify_authenticity_token

  def verify
    if current_user
      render json: {
        user: {
          name: current_user.name,
          imageUrl: current_user.image_url
        }
      }
    else
      head 400
    end
  end
end