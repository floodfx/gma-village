with updateu as
  (update users set 
    first_name=:firstName,
    last_name=:lastName,
    phone=:phone,
    active=:active,
    profile_image_url=:profileImageUrl,
    account_kit_user_id=:accountKitUserId,
    account_kit_access_token=:accountKitAccessToken,
    account_kit_access_token_expires_at=:accountKitAccessTokenExpiresAt,
    accepted_terms=:acceptedTerms,
    updated_at=default
  where
    id=:id
      and
    deleted=false 
    returning *
  )
select updateu.id, updateu.first_name, updateu.last_name, updateu.phone, updateu.user_type, updateu.active,
       updateu.profile_image_url, updateu.account_kit_access_token,
       updateu.account_kit_user_id, updateu.account_kit_access_token_expires_at,
       updateu.accepted_terms, updateu.created_by_user, updateu.created_on, updateu.updated_at
from updateu