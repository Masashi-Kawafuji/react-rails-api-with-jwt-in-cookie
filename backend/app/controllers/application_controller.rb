class ApplicationController < ActionController::API
  before_action :require_login

  private
  
  def http_header
    request.headers['Authorization']
  end

  def require_login
    if session_user.nil?
      render json: 'Unauthorized.', status: :unauthorized
    end
  end

  def session_user
    decoded_token = JsonWebToken.decode(http_header)
    if decoded_token.present?
      user_id = decoded_token.first[:user_id]
      user = User.find_by(id: user_id)
    end
  end
end
