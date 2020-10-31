class UsersController < ApplicationController
  skip_before_action :require_login, only: :create

  def create
    user = User.new(user_params) 
    if user.save
      payload = { user_id: user.id  }
      jwt_token = JsonWebToken.encode(payload)
      cookie[:jwt_token] = { value: jwt_token, httponly: true }
      render json: user, status: :created
    else
      render status: :unprocessable_entity
    end
  end


  private

  def user_params
    params.require(:user).permit(
      :name,
      :email,
      :password,
      :password_confirmation
    )
  end
end
