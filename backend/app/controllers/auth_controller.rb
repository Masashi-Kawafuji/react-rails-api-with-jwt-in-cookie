class AuthController < ApplicationController
  skip_before_action :require_login 

  def login
    user = User.find_by(params[:email])
    if user&.authenticate(params[:password])
      payload = { user_id: user.id  }
      jwt_token = JsonWebToken.encode(payload)   
      cookies[:jwt_token] = { value: jwt_token, httponly: true  }
      render json: user
    else
      render json: 'error', status: :unacceptable
    end
  end
end
