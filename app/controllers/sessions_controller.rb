class SessionsController < ApplicationController
  def create
    user_info = request.env["omniauth.auth"]

    # TODO user が存在しない場合は、作成する
    # user_info["uid"] と、user_info["info"]["name"] と、user_info["info"]["image"] を保存しよう
    # google_uid とかにしておこうかな

    # jwt token を生成して、response に 含める
    # ApplicationController で、毎回jwt を decode して、ユーザーを取得する
    # jwt には、id と有効期限を含める
  end
end
