module TokenActions
  extend ActiveSupport::Concern

  private

  def set_jwt_token_to_cookie(user)
    payload = { user_id: user.id  }
    jwt_token = JsonWebToken.encode(payload)   
    cookies[:jwt_token] = { value: jwt_token, httponly: true  }
  end
end
