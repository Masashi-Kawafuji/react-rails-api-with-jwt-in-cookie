class ApplicationController < ActionController::API
  before_action :require_login
  include ActionController::Cookies

  private
  
  def request_cookie
    cookies.encrypted['jwt']
  end

  def require_login
    render json: 'Unauthorized.', status: :unauthorized if current_user.nil?
  end

  def current_user
    token = request_cookie
    decoded_token = JsonWebToken.decode(token)
    if decoded_token.present?
      user_id = decoded_token[:user_id]
      user = User.find_by(id: user_id)
    end  
  end
end
