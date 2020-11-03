class ApplicationController < ActionController::API
  before_action :require_login
  include ActionController::Cookies

  private
  
  def request_cookie
    cookies.encrypted[:jwt]
  end

  def require_login
    render json: 'Unauthorized.', status: :unauthorized if current_user.nil?
  end

  def current_user
    token = request_cookie
    decoded_token = JsonWebToken.decode(token)
    @user ||= User.find_by(id: decoded_token[:user_id]) if decoded_token.present?
  end
end
