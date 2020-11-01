Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    unless Rails.env == 'production'
      origins 'localhost:3000'
    end

    resource '*',
      headers: :any,
      credentials: true,
      methods: [:get, :post, :put, :patch, :delete, :options, :head]
  end
end
