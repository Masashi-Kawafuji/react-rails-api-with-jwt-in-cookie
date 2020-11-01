class ApplicationController < ActionController::API
  before_action :require_login

  private
  
  def http_header
    request.headers['Authorization']
  end

  def require_loginn
    render json: 'Unauthorized.', status: :unauthorized if session_user.nil?
  end

  def current_user
    if http_header.present?
      token = http_header.split(' ').first
      decoded_token = JsonWebToken.decode(token)
      if decoded_token.present?
        user_id = decoded_token[:user_id]
        user = User.find_by(id: user_id)
      end  
    end
  end
end
