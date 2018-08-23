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

    # jwt token を生成して、response に 含める
    # TODO expiration date を作る
    issued_at = Time.zone.now
    key = Rails.application.credentials[:secret_key_base]
    token = JWT.encode({ id: user.id, iat: issued_at.to_i }, key, 'HS256')

    cookies[:token] = {
      value: token,
      secure: Rails.env.production? ? true : false
    }

    render file: 'public/dist/index.html', status: 200, layout: false
  end
end
