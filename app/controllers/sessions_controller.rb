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
    # ApplicationController で、毎回jwt を decode して、ユーザーを取得する
    # jwt には、id と有効期限を含める
  end
end
