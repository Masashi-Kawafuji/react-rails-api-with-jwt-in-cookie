class AuthController < ApplicationController
  skip_before_action :require_login 
  include TokenActions

  def login
    user = User.find_by(params[:email])
    if user&.authenticate(params[:password])
      set_jwt_token_to_cookie(user)
      render json: user
    else
      render json: 'error', status: :unacceptable
    end
  end
end
