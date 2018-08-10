class ApplicationController < ActionController::Base
  # request header から jwt を取り出し、検証する
  # 検証失敗したら、エラーレスポンスを返す
  def verify_jwt_token
    decoded_token.present?
  end

  # decode した token に 含まれる ID から、ユーザーを取得して返す
  def current_user
    token = decoded_token[0]

    if token.present?
      @current_user ||= User.where(id: token['id']).first
    else
      nil
    end
  end

  def jwt_bearer_token
    @jwt_bearer_token ||= if request.headers['Authorization'].present?
      scheme, token = request.headers['Authorization'].split(' ')
      (scheme == 'Bearer' ? token : nil)
    end
  end

  def decoded_token
    begin
      @token ||= JWT.decode(
        jwt_bearer_token,
        Rails.application.credentials[:secret_key_base],
        algorithm: 'HS256'
      )
    rescue JWT::DecodeError => e
      []
    end
  end
end
