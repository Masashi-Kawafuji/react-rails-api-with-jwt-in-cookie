module TokenActions
  extend ActiveSupport::Concern

  private

  def set_jwt_token_to_cookie(user)
    payload = { user_id: user.id  }
    jwt = JsonWebToken.encode(payload)   
    cookies[:jwt] = { value: jwt, httponly: true  }
  end
end
