class ApplicationController < ActionController::Base
  class ::TokenError < StandardError; end

  rescue_from CanCan::AccessDenied do |exception|
    respond_to do |format|
      format.json { head :forbidden }
    end
  end

  rescue_from TokenError do |exception|
    respond_to do |format|
      format.json { head :unauthorized }
    end
  end

  # request header から jwt を取り出し、検証する
  def verify_jwt_token
    raise TokenError if decoded_token.blank?
  end

  # decode した token に 含まれる ID から、ユーザーを取得して返す
  def current_user
    token = decoded_token

    if token.present?
      @current_user ||= User.where(id: token['id']).first
    else
      nil
    end
  end

  def jwt_bearer_token
    @jwt_bearer_token ||= if request.headers['Authorization'].present?
      scheme, token = request.headers['Authorization'].split(' ')
      (scheme == 'Bearer') ? token : nil
    end
  end

  def decoded_token
    begin
      @token ||= JWT.decode(
        jwt_bearer_token,
        Rails.application.credentials[:secret_key_base],
        true,
        algorithm: 'HS256'
      )
      @token[0]
    rescue JWT::DecodeError => e
      nil
    rescue JWT::ExpiredSignature => e
      nil
    end
  end
end
