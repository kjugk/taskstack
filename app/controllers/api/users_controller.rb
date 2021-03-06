class Api::UsersController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :verify_jwt_token, except: [:verify]

  def destroy
    if current_user.destroy
      head 200
    else
    end
  end

  def verify
    response.set_header('Cache-Control', 'no-store')

    if current_user
      render json: {
        user: {
          name: current_user.name,
          imageUrl: current_user.image_url,
          newUser: current_user.new_user
        }
      }
      # current_user.update(new_user: false) if current_user.new_user?
    else
      head 400
    end
  end
end
