class UsersController < ApplicationController
  skip_before_action :require_login, only: :create
  include TokenActions
  include ActionController::Cookies

  def create
    user = User.new(user_params)
    if user.save
      set_jwt_token_to_cookie(user)
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
