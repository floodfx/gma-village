SELECT u.id, u.first_name, u.last_name, u.phone, u.user_type, u.active,
       u.profile_image_url, u.account_kit_access_token, u.account_kit_user_id,
       u.account_kit_access_token_expires_at, u.accepted_terms, u.created_by_user,
       u.created_on, u.updated_at
FROM users as u, admins as a
WHERE
  (u.deleted=false or u.deleted=:deleted)
  AND
  u.user_type = 'ADMIN'
  AND
  u.id = :user_id