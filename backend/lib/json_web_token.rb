class JsonWebToken
  def self.encode(payload)
    JWT.encode(payload, Rails.application.credentials.hmac_secret, 'HS256')
  end

  def self.decode(token)
    JWT.decode(token, Rails.application.credentials.hmac_secret, true, { algorithm: 'HS256' })
  end
end
