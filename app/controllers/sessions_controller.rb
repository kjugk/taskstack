class SessionsController < ApplicationController
  def create
    user_info = request.env["omniauth.auth"]
    user = User.where(google_uid: user_info['uid']).first

    unless user
      user = User.create(
        google_uid: user_info['uid'],
        name: user_info['info']['name'],
        image_url: user_info['info']['image']
      )
    end

    exp = Time.now.to_i + 10 * 24 * 3600
    key = Rails.application.credentials[:secret_key_base]
    token = JWT.encode({ id: user.id, exp: exp }, key, 'HS256')

    cookies[:token] = {
      value: token,
      secure: Rails.env.production? ? false : false
    }

    render file: 'public/dist/index.html', status: 200, layout: false
  end
end
