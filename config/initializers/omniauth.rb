Rails.application.config.middleware.use OmniAuth::Builder do
  provider(
    :google_oauth2,
    Rails.application.credentials.oauth[:google_client_id],
    Rails.application.credentials.oauth[:google_client_secret],
    image_aspect_ratio: 'square',
    prompt: 'select_account'
  )
end