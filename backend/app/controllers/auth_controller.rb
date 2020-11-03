class AuthController < ApplicationController
  skip_before_action :require_login, only: :login
  include TokenActions
  include ActionController::Cookies

  def login
    user = User.find_by(email: params[:email])
    if user&.authenticate(params[:password])
      set_jwt_token_to_cookie(user)
      render json: user
    else
      render json: 'error', status: :unacceptable
    end
  end

  def logout
    cookies.delete :jwt
    render json: { message: 'logged out successfully.' }
  end
end
