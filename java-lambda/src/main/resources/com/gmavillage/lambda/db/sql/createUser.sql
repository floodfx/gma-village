with insertu as
  (insert into users
    (
      id, first_name, last_name, phone, user_type, active, profile_image_url,
      account_kit_access_token, account_kit_user_id, account_kit_access_token_expires_at,
      accepted_terms, created_by_user
    )
      values
    (
      default, :firstName, :lastName, :phone, :userType::user_type, :active, :profileImageUrl, 
      :accountKitAccessToken, :accountKitUserId, :accountKitAccessTokenExpiresAt,
      :acceptedTerms, :createdByUser
    )
    returning *
  )
select insertu.id, insertu.first_name, insertu.last_name, insertu.phone, insertu.user_type, insertu.active,
       insertu.profile_image_url, insertu.account_kit_access_token,
       insertu.account_kit_user_id, insertu.account_kit_access_token_expires_at,
       insertu.accepted_terms, insertu.created_by_user, insertu.created_on, insertu.updated_at
from insertu